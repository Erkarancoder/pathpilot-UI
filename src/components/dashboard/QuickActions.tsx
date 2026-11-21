import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Compass, Code2, Bot, LineChart, ArrowRight, Sparkles } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'

interface QuickActionsProps {
  onOpenRoadmap?: () => void
  onOpenPractice?: () => void
  onOpenMentor: () => void
  onScrollToAnalytics: () => void
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onOpenMentor: _onOpenMentor,
  onScrollToAnalytics: _onScrollToAnalytics,
}) => {
  const navigate = useNavigate()

  const actions = [
    {
      title: 'Course Roadmaps',
      description: 'Personalized curriculum progression, lesson notes, and hands-on challenges',
      icon: <Compass className="w-5 h-5 text-[#F02BC8]" />,
      badge: 'Active',
      badgeVariant: 'pink' as const,
      onClick: () => navigate('/roadmap'),
    },
    {
      title: 'Code Practice Lab',
      description: 'Solve LeetCode-aligned pattern checklists and MCQ quizzes with accuracy tracking',
      icon: <Code2 className="w-5 h-5 text-[#9255FF]" />,
      badge: 'Active',
      badgeVariant: 'violet' as const,
      onClick: () => navigate('/practice'),
    },
    {
      title: 'AI Study Mentor',
      description: 'Deterministic Socratic guidance, quiz mistake diagnosis, and study plans',
      icon: <Bot className="w-5 h-5 text-[#FF6BE6]" />,
      badge: 'Active',
      badgeVariant: 'pink' as const,
      onClick: () => navigate('/mentor'),
    },
    {
      title: 'Weekly Analytics',
      description: 'Review multi-metric learning trends, quiz accuracy, and skill mastery',
      icon: <LineChart className="w-5 h-5 text-emerald-400" />,
      badge: 'Active',
      badgeVariant: 'violet' as const,
      onClick: () => navigate('/analytics'),
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#F7F3FF] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#F02BC8]" />
          Platform Modules &amp; Tools
        </h3>
        <span className="text-xs text-[#A7A0C5]">Click any card to explore</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((act) => (
          <button
            key={act.title}
            onClick={act.onClick}
            className="text-left group focus:outline-none cursor-pointer"
          >
            <Card
              variant="default"
              className="h-full p-4 hover:border-[rgba(240,43,200,0.45)] hover:shadow-[0_4px_20px_rgba(240,43,200,0.15)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.2)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {act.icon}
                  </div>
                  <Badge variant={act.badgeVariant} size="sm">
                    {act.badge}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#F7F3FF] group-hover:text-[#FF6BE6] transition-colors flex items-center justify-between">
                    {act.title}
                    <ArrowRight className="w-3.5 h-3.5 text-[#A7A0C5] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-xs text-[#A7A0C5] mt-1 leading-relaxed line-clamp-2">
                    {act.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}
