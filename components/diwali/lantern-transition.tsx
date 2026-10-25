'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'

type LanternArtwork = {
  src: string
  width: number
  height: number
}

type LanternMotion = {
  artwork: number
  x: number
  y: number
  width: number
  startY: number
  delay: number
  revealDuration: number
  exitStart: number
  exitDistance: number
  opacity: number
  scale: number
  blur: number
  rotation: number
  sway: number
  drift: number
  sideOffset: number
  depth: number
}

const lanternArtwork: LanternArtwork[] = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%282%29-LJv8EtXKiK1jrSkFNvCxU8fxEPPVTK.png',
    width: 972,
    height: 1181,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Glowing%20Sky%20Lantern%20Illustration%20_%20Canva%20Element%20for%20Festivals-9MtgQX5TtkFNkSrp2MgOXERHQ0B8uA.png',
    width: 1170,
    height: 1800,
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mid%20Autumn%20Sky%20Lantern%20_%20Canva%20Element%20Keyword-J5sHZ8XmV5fmyh7HkrwQk8T3VyOqUG.png',
    width: 1008,
    height: 1704,
  },
]

const lanterns: LanternMotion[] = [
  { artwork: 0, x: 5, y: 0.65, width: 15, startY: 0.86, delay: 0.02, revealDuration: 0.43, exitStart: 0.77, exitDistance: 1.45, opacity: 0.62, scale: 0.92, blur: 0, rotation: -7, sway: 4, drift: 4, sideOffset: -25, depth: 3 },
  { artwork: 1, x: 48, y: 0.04, width: 7, startY: 0.7, delay: 0.18, revealDuration: 0.4, exitStart: 0.86, exitDistance: 1.25, opacity: 0.28, scale: 0.72, blur: 2.2, rotation: 4, sway: -3, drift: -3, sideOffset: 0, depth: 1 },
  { artwork: 2, x: 93, y: 0.42, width: 16, startY: 0.82, delay: 0.08, revealDuration: 0.42, exitStart: 0.79, exitDistance: 1.5, opacity: 0.42, scale: 1.02, blur: 1.4, rotation: 6, sway: -4, drift: -5, sideOffset: 27, depth: 4 },
  { artwork: 0, x: 27, y: 0.22, width: 8, startY: 0.76, delay: 0.11, revealDuration: 0.4, exitStart: 0.84, exitDistance: 1.32, opacity: 0.6, scale: 0.76, blur: 0, rotation: 2, sway: -3, drift: 2, sideOffset: 0, depth: 2 },
  { artwork: 1, x: 72, y: 0.71, width: 13, startY: 0.9, delay: 0.04, revealDuration: 0.44, exitStart: 0.81, exitDistance: 1.42, opacity: 0.48, scale: 0.98, blur: 0.4, rotation: -3, sway: 4, drift: -4, sideOffset: 0, depth: 3 },
  { artwork: 2, x: 12, y: 0.12, width: 10, startY: 0.72, delay: 0.2, revealDuration: 0.39, exitStart: 0.88, exitDistance: 1.28, opacity: 0.34, scale: 0.82, blur: 1.8, rotation: -5, sway: 3, drift: 5, sideOffset: -22, depth: 1 },
  { artwork: 0, x: 83, y: 0.1, width: 9, startY: 0.74, delay: 0.16, revealDuration: 0.4, exitStart: 0.83, exitDistance: 1.35, opacity: 0.52, scale: 0.78, blur: 0.8, rotation: 5, sway: -2, drift: -3, sideOffset: 20, depth: 2 },
  { artwork: 1, x: 54, y: 0.49, width: 7, startY: 0.82, delay: 0.09, revealDuration: 0.43, exitStart: 0.8, exitDistance: 1.4, opacity: 0.54, scale: 0.74, blur: 0, rotation: 1, sway: -4, drift: 3, sideOffset: 0, depth: 2 },
  { artwork: 2, x: 65, y: 0.2, width: 12, startY: 0.84, delay: 0.06, revealDuration: 0.42, exitStart: 0.82, exitDistance: 1.38, opacity: 0.56, scale: 0.92, blur: 0, rotation: 3, sway: 4, drift: -2, sideOffset: 0, depth: 3 },
  { artwork: 0, x: 18, y: 0.42, width: 12, startY: 0.9, delay: 0.12, revealDuration: 0.43, exitStart: 0.78, exitDistance: 1.48, opacity: 0.5, scale: 0.94, blur: 1.1, rotation: -4, sway: 3, drift: 5, sideOffset: -20, depth: 4 },
  { artwork: 1, x: 40, y: 0.76, width: 11, startY: 0.86, delay: 0.03, revealDuration: 0.42, exitStart: 0.84, exitDistance: 1.38, opacity: 0.54, scale: 0.88, blur: 0, rotation: -2, sway: 4, drift: -3, sideOffset: 0, depth: 3 },
  { artwork: 2, x: 89, y: 0.77, width: 15, startY: 0.94, delay: 0.08, revealDuration: 0.45, exitStart: 0.76, exitDistance: 1.5, opacity: 0.4, scale: 1, blur: 1.5, rotation: 7, sway: -5, drift: -5, sideOffset: 24, depth: 4 },
  { artwork: 0, x: 31, y: 0.58, width: 8, startY: 0.82, delay: 0.2, revealDuration: 0.4, exitStart: 0.86, exitDistance: 1.32, opacity: 0.56, scale: 0.74, blur: 0, rotation: 4, sway: -3, drift: 2, sideOffset: 0, depth: 2 },
  { artwork: 1, x: 77, y: 0.34, width: 8, startY: 0.73, delay: 0.14, revealDuration: 0.4, exitStart: 0.82, exitDistance: 1.36, opacity: 0.42, scale: 0.76, blur: 2.1, rotation: -4, sway: 3, drift: -4, sideOffset: 23, depth: 1 },
  { artwork: 2, x: 57, y: 0.08, width: 11, startY: 0.8, delay: 0.05, revealDuration: 0.44, exitStart: 0.8, exitDistance: 1.4, opacity: 0.52, scale: 0.88, blur: 0.5, rotation: 3, sway: -4, drift: 3, sideOffset: 0, depth: 3 },
  { artwork: 0, x: 2, y: 0.28, width: 14, startY: 0.78, delay: 0.17, revealDuration: 0.41, exitStart: 0.85, exitDistance: 1.4, opacity: 0.38, scale: 0.94, blur: 1.6, rotation: -8, sway: 4, drift: 5, sideOffset: -28, depth: 2 },
  { artwork: 1, x: 98, y: 0.17, width: 10, startY: 0.79, delay: 0.1, revealDuration: 0.42, exitStart: 0.81, exitDistance: 1.34, opacity: 0.48, scale: 0.82, blur: 1, rotation: 6, sway: -3, drift: -5, sideOffset: 27, depth: 2 },
  { artwork: 2, x: 45, y: 0.88, width: 8, startY: 0.96, delay: 0.01, revealDuration: 0.42, exitStart: 0.87, exitDistance: 1.3, opacity: 0.44, scale: 0.76, blur: 0, rotation: -2, sway: 3, drift: 2, sideOffset: 0, depth: 2 },
]

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const smoothstep = (value: number) => value * value * (3 - 2 * value)

export function LanternTransition() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const scene = sceneRef.current

    if (!wrapper || !scene) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (prefersReducedMotion.matches) return

    const lanternElements = scene.querySelectorAll<HTMLElement>('.lantern-transition__lantern')
    let frame = 0

    const updateProgress = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        const bounds = wrapper.getBoundingClientRect()
        const progress = clamp((window.innerHeight - bounds.top) / Math.max(bounds.height, 1))
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const backgroundProgress = smoothstep(clamp((progress - 0.34) / 0.66))
        const headingProgress = smoothstep(clamp((progress - 0.79) / 0.21))
        const ambientProgress = Math.sin(Math.PI * progress)

        scene.style.setProperty('--transition-progress', String(progress))
        scene.style.setProperty('--why-background-opacity', String(backgroundProgress))
        scene.style.setProperty('--why-intro-opacity', String(headingProgress))
        scene.style.setProperty('--why-intro-y', `${(1 - headingProgress) * 26}px`)
        scene.style.setProperty('--why-intro-blur', `${(1 - headingProgress) * 6}px`)
        scene.style.setProperty('--why-intro-scale', String(1.08 - headingProgress * 0.08))
        scene.style.setProperty('--lantern-ambience', String(ambientProgress))

        lanternElements.forEach((element, index) => {
          const lantern = lanterns[index]
          if (!lantern) return

          const reveal = smoothstep(clamp((progress - lantern.delay) / lantern.revealDuration))
          const exit = smoothstep(clamp((progress - lantern.exitStart) / (1 - lantern.exitStart)))
          const horizontalOffset =
            (lantern.drift * progress + lantern.sideOffset * (1 - reveal)) * (viewportWidth / 100)
          const verticalOffset =
            ((1 - reveal) * lantern.startY - exit * lantern.exitDistance) * viewportHeight
          const scale = lantern.scale * (0.7 + reveal * 0.44 + exit * 0.12)
          const opacity = lantern.opacity * reveal * (1 - exit)
          const rotation = lantern.rotation + lantern.sway * progress

          element.style.opacity = String(opacity)
          element.style.transform = `translate3d(calc(-50% + ${horizontalOffset}px), calc(-50% + ${verticalOffset}px), 0) rotate(${rotation}deg) scale(${scale})`
        })

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
    <>
      {lanternArtwork.map((artwork) => (
        <link key={artwork.src} rel="preload" as="image" href={artwork.src} />
      ))}
      <div ref={wrapperRef} className="lantern-transition" aria-hidden="true">
        <div ref={sceneRef} className="lantern-transition__scene">
          <div className="lantern-transition__backdrop" />
          <div className="lantern-transition__why-background" />
          <div className="lantern-transition__ambient" />
          <div className="lantern-transition__field">
            {lanterns.map((lantern, index) => {
              const artwork = lanternArtwork[lantern.artwork]
              const style = {
                '--lantern-x': `${lantern.x}%`,
                '--lantern-y': `${lantern.y * 100}%`,
                '--lantern-width': `${lantern.width}vw`,
                '--lantern-opacity': String(lantern.opacity),
                '--lantern-scale': String(lantern.scale),
                '--lantern-rotation': `${lantern.rotation}deg`,
                '--lantern-blur': `${lantern.blur}px`,
                '--lantern-depth': lantern.depth,
              } as CSSProperties

              return (
                <div key={`${lantern.artwork}-${index}`} className="lantern-transition__lantern" style={style}>
                  <Image
                    src={artwork.src}
                    alt=""
                    width={artwork.width}
                    height={artwork.height}
                    sizes="(max-width: 760px) 24vw, 16vw"
                    loading="eager"
                    fetchPriority="low"
                    unoptimized
                    className="lantern-transition__image"
                  />
                </div>
              )
            })}
          </div>
          <div className="lantern-transition__why-preview">
            <h2>why you need it</h2>
            <span>swipe / scroll sideways</span>
          </div>
        </div>
      </div>
    </>
  )
}
