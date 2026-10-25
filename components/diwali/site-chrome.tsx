'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Volume2, VolumeX } from 'lucide-react'
import { partyConfig } from '@/lib/party-config'
import { BrandMark } from './brand-mark'

function SoundControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const soundSrc = partyConfig.soundSrc

  useEffect(() => {
    const audio = audioRef.current

    const updateScrollState = () => {
      const nextIsScrolled = window.scrollY > 48
      setIsScrolled((current) => current === nextIsScrolled ? current : nextIsScrolled)

      if (audio) {
        const scrollFade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 1.35))
        audio.volume = isPlaying ? 0.18 * scrollFade : 0
      }
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [isPlaying, soundSrc])

  const toggleSound = async () => {
    const audio = audioRef.current

    if (!audio || !soundSrc) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      audio.volume = 0.18
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <>
      <button
        aria-label={soundSrc ? (isPlaying ? 'Mute sound effects' : 'Play sound effects') : 'Sound effects unavailable until an audio asset is added'}
        aria-pressed={isPlaying}
        title={soundSrc ? undefined : 'Sound effects remain disabled until an audio asset is added'}
        className={`sound-control${isScrolled ? ' sound-control--compact' : ''}`}
        disabled={!soundSrc}
        onClick={toggleSound}
        type="button"
      >
        {isPlaying ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        <span className="sound-control__label">{soundSrc ? (isPlaying ? 'Sound on' : 'Sound off') : 'Sound off · asset TBD'}</span>
      </button>
      {soundSrc ? <audio ref={audioRef} src={soundSrc} loop preload="none" /> : null}
    </>
  )
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <BrandMark size="persistent" />
      <SoundControl />
    </header>
  )
}

export function LiquidGlass() {
  const glassRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const glass = glassRef.current
    const heading = document.getElementById('why-heading')?.closest('.section-heading')

    if (!glass || !heading) return

    let animationFrame = 0

    const updateOverlap = () => {
      if (animationFrame) return

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0
        const glassBounds = glass.getBoundingClientRect()
        const headingBounds = heading.getBoundingClientRect()
        const overlaps =
          headingBounds.bottom > glassBounds.top - 6 &&
          headingBounds.top < glassBounds.bottom + 6 &&
          headingBounds.right > glassBounds.left - 8 &&
          headingBounds.left < glassBounds.right + 8

        glass.classList.toggle(
          'liquid-glass--occluded',
          overlaps && document.activeElement !== glass,
        )
      })
    }

    updateOverlap()
    window.addEventListener('scroll', updateOverlap, { passive: true })
    window.addEventListener('resize', updateOverlap)
    document.addEventListener('focusin', updateOverlap)
    document.addEventListener('focusout', updateOverlap)

    return () => {
      window.removeEventListener('scroll', updateOverlap)
      window.removeEventListener('resize', updateOverlap)
      document.removeEventListener('focusin', updateOverlap)
      document.removeEventListener('focusout', updateOverlap)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <a
      ref={glassRef}
      className="liquid-glass"
      href="#event-details"
      aria-label="Jump to event details"
    >
      <span className="liquid-glass__refraction" aria-hidden="true" />
      <span className="liquid-glass__highlight" aria-hidden="true" />
      <span className="liquid-glass__label">event details</span>
      <span className="liquid-glass__icon" aria-hidden="true">
        <ArrowDown />
      </span>
      <svg className="liquid-glass__filter-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="liquid-glass-displacement"
            x="-12%"
            y="-24%"
            width="124%"
            height="148%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025 0.06"
              numOctaves="1"
              seed="8"
              result="glass-noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="glass-noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </a>
  )
}
