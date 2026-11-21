import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Compass } from 'lucide-react'

export const LandingFooter: React.FC = () => {
  const navigate = useNavigate()

  return (
    <footer className="border-t border-[rgba(146,85,255,0.15)] bg-[#080611] pt-16 pb-12 text-[#A7A0C5] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[rgba(146,85,255,0.1)]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center shadow-[0_0_15px_rgba(240,43,200,0.35)]">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-[#F7F3FF]">
                Path<span className="text-[#F02BC8]">Pilot</span>
              </span>
            </Link>
            <p className="text-xs text-[#A7A0C5] leading-relaxed max-w-sm">
              A structured student success platform that turns complex university coursework into focused daily learning roadmaps, test-driven coding labs, and continuous placement preparation.
            </p>
            <div className="pt-1 text-[11px] text-[#A7A0C5]/70 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#FF6BE6]" />
              <span>Designed for College Students &amp; Junior Engineers.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F3FF]">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-[#F7F3FF] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#F7F3FF] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-[#F7F3FF] transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate('/design-system')}
                  className="hover:text-[#F7F3FF] transition-colors cursor-pointer text-left"
                >
                  Design System Preview
                </button>
              </li>
            </ul>
          </div>

          {/* Workspace Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F3FF]">
              Workspace
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hover:text-[#F7F3FF] transition-colors cursor-pointer text-left"
                >
                  Student Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hover:text-[#F7F3FF] transition-colors cursor-pointer text-left"
                >
                  Daily Sprint Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hover:text-[#F7F3FF] transition-colors cursor-pointer text-left"
                >
                  Algorithm Practice Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F3FF]">
              Campus Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF6BE6]" />
                <span className="text-[#F7F3FF]">support@pathpilot.campus.edu</span>
              </li>
              <li>
                <span className="text-[#A7A0C5]">University Syllabus Integration</span>
              </li>
              <li>
                <span className="text-[#A7A0C5]">Student Peer Community</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7A0C5]">
          <p>© 2026 PathPilot. All rights reserved. Open for academic exploration.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F7F3FF] cursor-pointer">Student Privacy</span>
            <span className="hover:text-[#F7F3FF] cursor-pointer">Academic Guidelines</span>
            <span className="hover:text-[#F7F3FF] cursor-pointer">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
