'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
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
  return (
    <div className="liquid-glass" aria-hidden="true">
      <span className="liquid-glass__highlight" />
      <span className="liquid-glass__bead liquid-glass__bead--one" />
      <span className="liquid-glass__bead liquid-glass__bead--two" />
      <span className="liquid-glass__bead liquid-glass__bead--three" />
    </div>
  )
}
