'use client'

import { useScrollReveal } from './use-scroll-reveal'

export function ThemeJoke() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="theme-joke"
      className={`theme-joke${isVisible ? ' is-visible' : ''}`}
      aria-labelledby="theme-joke-heading"
    >
      <h2 id="theme-joke-heading">boomer choice</h2>
    </section>
  )
}

export function SiteFooter() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <footer ref={ref} className={`site-footer${isVisible ? ' is-visible' : ''}`}>
      <p>ai used yugal to make ts or sm shi</p>
    </footer>
  )
}
