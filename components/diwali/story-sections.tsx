'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { PointerEvent } from 'react'
import { useScrollReveal } from './use-scroll-reveal'
import { partyConfig } from '@/lib/party-config'

type StoryScene = (typeof partyConfig.scenes)[number]

function VenueTeaser() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="venue-teaser"
      className={`venue-teaser${isVisible ? ' is-visible' : ''}`}
      aria-labelledby="venue-teaser-heading"
    >
      <div className="venue-teaser__copy">
        <h2 id="venue-teaser-heading">need venue and time</h2>
        <p>scroll more</p>
        <span>(work you fingers more)</span>
      </div>
    </section>
  )
}

function StoryScene({ scene }: { scene: StoryScene }) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()
  const artRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = ref.current
    const artwork = artRef.current

    if (scene.id !== 'games' || !section || !artwork) return

    const setGameProgress = (progress: number) => {
      artwork.style.setProperty('--game-die-x', `${(progress - 0.5) * 34}px`)
      artwork.style.setProperty('--game-die-y', `${(0.5 - progress) * 28}px`)
      artwork.style.setProperty('--game-die-rotate', `${(progress - 0.5) * 14}deg`)
      artwork.style.setProperty('--game-card-y', `${(progress - 0.5) * 40}px`)
      artwork.style.setProperty('--game-card-rotate', `${(0.5 - progress) * 18}deg`)
      artwork.style.setProperty('--game-token-x', `${(0.5 - progress) * 30}px`)
      artwork.style.setProperty('--game-token-y', `${(progress - 0.5) * 18}px`)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGameProgress(0.5)
      return
    }

    let frame = 0

    const updateProgress = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect()
        const progress = Math.min(
          1,
          Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)),
        )
        setGameProgress(progress)
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
  }, [ref, scene.id])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height))
    event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * 3}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 4}deg`)
    event.currentTarget.style.setProperty('--light-x', `${x * 100}%`)
    event.currentTarget.style.setProperty('--light-y', `${y * 100}%`)
  }

  const resetPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
    event.currentTarget.style.setProperty('--light-x', '50%')
    event.currentTarget.style.setProperty('--light-y', '50%')
  }

  return (
    <section
      ref={ref}
      className={`story-scene story-scene--${scene.id}${isVisible ? ' is-visible' : ''}`}
      aria-labelledby={`scene-heading-${scene.id}`}
    >
      <div className="story-scene__inner">
        <div className="story-scene__copy">
          <h2 id={`scene-heading-${scene.id}`}>{scene.heading}</h2>
          <p>{scene.tagline}</p>
        </div>
        <figure
          ref={artRef}
          className="story-scene__art"
          onPointerMove={scene.id === 'food-drinks' ? undefined : handlePointerMove}
          onPointerLeave={scene.id === 'food-drinks' ? undefined : resetPointer}
          onPointerUp={scene.id === 'food-drinks' ? undefined : resetPointer}
        >
          <Image
            src={scene.imageSrc}
            alt={scene.imageAlt}
            fill
            sizes="(max-width: 760px) 90vw, 54vw"
            className="story-scene__image"
          />
          {scene.id === 'games' ? (
            <span className="game-drift-layer" aria-hidden="true">
              <span className="game-drift game-drift--die" />
              <span className="game-drift game-drift--card" />
              <span className="game-drift game-drift--token" />
            </span>
          ) : null}
        </figure>
      </div>
    </section>
  )
}

function WhatWillBeThere() {
  return (
    <div id="what-will-be-there" className="story-scenes" aria-label="What will be there">
      {partyConfig.scenes.map((scene) => (
        <StoryScene key={scene.id} scene={scene} />
      ))}
    </div>
  )
}

function AttentionMilestone() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="attention-milestone"
      className={`attention-milestone${isVisible ? ' is-visible' : ''}`}
      aria-label="Attention-span milestone"
    >
      <div className="attention-milestone__copy">
        <p>you made it far enough</p>
        <p>you are doing good for your attention span</p>
      </div>
    </section>
  )
}

export function StorySections() {
  return (
    <>
      <VenueTeaser />
      <WhatWillBeThere />
      <AttentionMilestone />
    </>
  )
}
