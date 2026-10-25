import { EventDetails } from '@/components/diwali/event-details'
import { HeroSection } from '@/components/diwali/hero-section'
import { LiquidGlass, SiteHeader } from '@/components/diwali/site-chrome'
import { StorySections } from '@/components/diwali/story-sections'
import { WhySection } from '@/components/diwali/why-section'

export default function Home() {
  return (
    <div className="invitation-site">
      <SiteHeader />
      <main>
        <HeroSection />
        <WhySection />
        <StorySections />
        <EventDetails />
        <section id="theme-joke" className="theme-joke" aria-labelledby="theme-joke-heading">
          <h2 id="theme-joke-heading">boomer choice</h2>
        </section>
      </main>
      <footer className="site-footer">
        <p>ai used yugal to make ts or sm shi</p>
      </footer>
      <LiquidGlass />
    </div>
  )
}
