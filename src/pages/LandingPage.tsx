import React from 'react'
import { LandingNavbar } from '../components/landing/LandingNavbar'
import { LandingHero } from '../components/landing/LandingHero'
import { LandingFeatures } from '../components/landing/LandingFeatures'
import { LandingHowItWorks } from '../components/landing/LandingHowItWorks'
import { LandingBenefits } from '../components/landing/LandingBenefits'
import { LandingCta } from '../components/landing/LandingCta'
import { LandingFooter } from '../components/landing/LandingFooter'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090817] text-[#F7F3FF] selection:bg-[#F02BC8] selection:text-white">
      {/* 1. Navigation Bar with smooth scrolling & mobile menu */}
      <LandingNavbar />

      {/* Main Landing Page Content */}
      <main>
        {/* 2. Hero Section with Headline, CTAs, and Visual Dashboard Preview */}
        <LandingHero />

        {/* 3. Features Section (5 Core Features) */}
        <LandingFeatures />

        {/* 4. How It Works (4-Step Student Journey) */}
        <LandingHowItWorks />

        {/* 5. Benefits Section (4 Tangible Academic Outcomes) */}
        <LandingBenefits />

        {/* 6. Final Conversion Call-to-Action */}
        <LandingCta />
      </main>

      {/* 7. Footer */}
      <LandingFooter />
    </div>
  )
}
