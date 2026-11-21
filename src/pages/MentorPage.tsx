import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Bot,
  Calendar,
} from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { MentorChatView } from '../components/mentor/MentorChatView'
import { StudyPlanSection } from '../components/mentor/StudyPlanSection'
import { getOnboardingData } from '../lib/storage'

export const MentorPage: React.FC = () => {
  const onboarding = getOnboardingData()
  const [activeTab, setActiveTab] = useState<'assistant' | 'study-plan'>('assistant')

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[rgba(146,85,255,0.15)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="text-xs text-[#A7A0C5] hover:text-[#F7F3FF] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <span className="text-[#A7A0C5]">•</span>
            <span className="text-xs text-[#FF6BE6] font-medium">Phase 7: AI Mentor</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3FF] tracking-tight">
              AI Study Assistant & Planning
            </h1>
            <Badge variant="pink" size="sm">
              Local Demo
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#A7A0C5]">
            Deterministic academic mentor, quiz mistake analyzer, and weekly study plan generator for{' '}
            <strong className="text-[#F7F3FF]">{onboarding?.fullName || 'College Student'}</strong>.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-[#080611] border border-[rgba(146,85,255,0.2)] shrink-0 self-start sm:self-center">
          <button
            onClick={() => setActiveTab('assistant')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'assistant'
                ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_15px_rgba(240,43,200,0.4)]'
                : 'text-[#A7A0C5] hover:text-[#F7F3FF]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Study Assistant</span>
          </button>
          <button
            onClick={() => setActiveTab('study-plan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'study-plan'
                ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_15px_rgba(240,43,200,0.4)]'
                : 'text-[#A7A0C5] hover:text-[#F7F3FF]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Study Plan Generator</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'assistant' ? (
        <MentorChatView onSwitchToStudyPlan={() => setActiveTab('study-plan')} />
      ) : (
        <StudyPlanSection />
      )}
    </div>
  )
}
