'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { partyConfig } from '@/lib/party-config'
import { BrandMark } from './brand-mark'

function LanternCluster() {
  return (
    <div className="hero-lantern-field" aria-hidden="true">
      <div className="hero-lantern hero-lantern--left">
        <span className="hero-lantern__glow" />
        <span className="hero-lantern__body" />
      </div>
      <div className="hero-lantern hero-lantern--center">
        <span className="hero-lantern__glow" />
        <span className="hero-lantern__body" />
      </div>
      <div className="hero-lantern hero-lantern--right">
        <span className="hero-lantern__glow" />
        <span className="hero-lantern__body" />
      </div>
      <div className="hero-lens-flare" />
    </div>
  )
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null)
  const lanternRef = useRef<HTMLDivElement | null>(null)
  const [hasBegun, setHasBegun] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    const lanterns = lanternRef.current

    if (!hero || !lanterns) return

    const applyProgress = (progress: number) => {
      lanterns.style.setProperty('--lantern-progress', String(progress))
      lanterns.style.setProperty('--lantern-rise', `${42 - progress * 142}px`)
      lanterns.style.setProperty('--center-scale', String(0.72 + progress * 0.42))
      lanterns.style.setProperty('--side-scale', String(0.54 + progress * 0.22))
      lanterns.style.setProperty('--lantern-blur', `${(1 - progress) * 5}px`)
      lanterns.style.setProperty('--center-opacity', String(0.18 + progress * 0.82))
      lanterns.style.setProperty('--side-opacity', String(0.12 + progress * 0.52))
      lanterns.style.setProperty('--glow-opacity', String(0.1 + progress * 0.76))
      lanterns.style.setProperty('--flare-opacity', String(Math.sin(Math.PI * progress) * 0.34))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyProgress(1)
      lanterns.style.setProperty('--flare-opacity', '0')
      return
    }

    let frame = 0

    const updateProgress = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect()
        const travel = Math.max(bounds.height * 0.9, window.innerHeight)
        const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.bottom) / travel))
        applyProgress(progress)
        frame = 0
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="opening"
      className={`hero-section${hasBegun ? ' hero-section--started' : ''}`}
      aria-labelledby="invitation-title"
      style={{ backgroundImage: `linear-gradient(180deg, rgba(12, 8, 12, .42), rgba(9, 7, 9, .82) 78%), url("${partyConfig.heroBackdropSrc}")` }}
    >
      <div className="hero-grain" aria-hidden="true" />
      <div ref={lanternRef} className="hero-lanterns" aria-hidden="true">
        <LanternCluster />
      </div>

      <div className="hero-stage">
        <button
          className="hero-gate"
          type="button"
          onClick={() => setHasBegun(true)}
          aria-label="Tap to begin the invitation"
        >
          <span>tap to begin</span>
          <ArrowDown aria-hidden="true" />
        </button>

        <div className="hero-invite" aria-hidden={!hasBegun}>
          <BrandMark />
          <h1 id="invitation-title">
            <span>you are invited to</span>
            <span className="hero-title__second-line">
              a banger <em>Diwali party</em>
            </span>
          </h1>
        </div>
      </div>
    </section>
  )
}
