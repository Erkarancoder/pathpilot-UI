import React from 'react'
import {
  Layers,
  Coffee,
  Code2,
  Atom,
  Terminal,
  Palette,
  Database,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import type { CategoryMetadata } from '../../data/practiceData'

interface CategoryCardProps {
  category: CategoryMetadata
  totalQuestions: number
  stats?: {
    attempts: number
    score: number
    total: number
    percentage: number
  }
  onStartQuiz: (category: CategoryMetadata) => void
}

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Atom: <Atom className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  totalQuestions,
  stats,
  onStartQuiz,
}) => {
  const hasAttempts = stats && stats.attempts > 0

  return (
    <Card
      variant="default"
      className="group p-5 flex flex-col justify-between hover:border-[rgba(240,43,200,0.4)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.35)] transition-all duration-200"
    >
      <CardContent className="p-0 space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform"
            style={{
              backgroundColor: `${category.color}20`,
              color: category.color,
              border: `1px solid ${category.color}40`,
            }}
          >
            {iconMap[category.icon] || <Sparkles className="w-5 h-5" />}
          </div>

          <Badge variant="violet" size="sm">
            {totalQuestions} Questions
          </Badge>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base font-extrabold text-[#F7F3FF] group-hover:text-[#FF6BE6] transition-colors leading-snug">
            {category.title}
          </h3>
          <p className="text-xs text-[#A7A0C5] leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>

        {/* Attempt & Accuracy Status */}
        <div className="p-2.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.14)] flex items-center justify-between text-xs">
          <span className="text-[#A7A0C5]">
            {hasAttempts ? `${stats.attempts} Quizzes Logged` : 'Not Attempted'}
          </span>
          {hasAttempts ? (
            <span className="font-bold text-[#FF6BE6]">
              {stats.percentage}% Accuracy
            </span>
          ) : (
            <span className="text-[11px] text-[#A7A0C5]">
              Ready to assess
            </span>
          )}
        </div>
      </CardContent>

      {/* Action Button */}
      <div className="pt-4 mt-2 border-t border-[rgba(146,85,255,0.1)]">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onStartQuiz(category)}
          className="w-full justify-center"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          {hasAttempts ? 'Practice Again' : 'Start Quiz'}
        </Button>
      </div>
    </Card>
  )
}
