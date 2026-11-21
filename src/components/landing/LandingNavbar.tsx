import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Benefits', href: '#benefits' },
  ]

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#090817]/92 backdrop-blur-md border-b border-[rgba(146,85,255,0.18)] shadow-[0_10px_30px_rgba(0,0,0,0.65)] py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F02BC8] via-[#B819E0] to-[#9255FF] flex items-center justify-center shadow-[0_0_20px_rgba(240,43,200,0.45)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-[#F7F3FF]">
                  Path<span className="text-[#F02BC8]">Pilot</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[rgba(240,43,200,0.15)] text-[#FF6BE6] border border-[rgba(240,43,200,0.3)]">
                  Student
                </span>
              </div>
              <span className="text-[11px] text-[#A7A0C5] tracking-wide">
                Academic Success Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 p-1 rounded-full bg-[#171536]/80 border border-[rgba(146,85,255,0.18)] backdrop-blur px-5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-1.5 text-xs font-medium text-[#A7A0C5] hover:text-[#F7F3FF] hover:bg-[#211C50]/80 rounded-full transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-xs"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/onboarding')}
              className="shadow-[0_0_20px_rgba(240,43,200,0.35)]"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-xs px-3"
            >
              App
            </Button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 text-[#A7A0C5] hover:text-[#F7F3FF] rounded-xl hover:bg-[#171536] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#080611]/98 border-b border-[rgba(146,85,255,0.2)] backdrop-blur-2xl px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm font-medium text-[#A7A0C5] hover:text-[#F7F3FF] py-2 border-b border-[rgba(146,85,255,0.08)] cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-2.5">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  leftIcon={<LayoutDashboard className="w-4 h-4" />}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    navigate('/dashboard')
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    navigate('/onboarding')
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
