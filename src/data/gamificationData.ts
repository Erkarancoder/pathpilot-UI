import type { AchievementBadge } from '../types'

export const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete the student onboarding and skill diagnostic assessment.',
    icon: 'Compass',
    xpReward: 50,
    category: 'onboarding',
    unlocked: false,
  },
  {
    id: 'curious-mind',
    title: 'Curious Mind',
    description: 'Complete your first curriculum lesson from any learning path.',
    icon: 'BookOpen',
    xpReward: 50,
    category: 'learning',
    unlocked: false,
  },
  {
    id: 'roadmap-scholar',
    title: 'Roadmap Scholar',
    description: 'Complete 3 or more lessons on your personalized course roadmap.',
    icon: 'GraduationCap',
    xpReward: 100,
    category: 'learning',
    unlocked: false,
  },
  {
    id: 'quiz-apprentice',
    title: 'Quiz Apprentice',
    description: 'Complete your first practice quiz in any category.',
    icon: 'Award',
    xpReward: 40,
    category: 'quiz',
    unlocked: false,
  },
  {
    id: 'sharpshooter',
    title: 'Sharpshooter',
    description: 'Score a perfect 100% on any practice lab quiz.',
    icon: 'Target',
    xpReward: 100,
    category: 'quiz',
    unlocked: false,
  },
  {
    id: 'code-pioneer',
    title: 'Code Pioneer',
    description: 'Successfully run and pass all test cases on a DSA coding problem.',
    icon: 'Code2',
    xpReward: 80,
    category: 'coding',
    unlocked: false,
  },
  {
    id: 'polyglot-coder',
    title: 'Polyglot Coder',
    description: 'Submit solutions in two or more programming languages in the Coding Lab.',
    icon: 'Cpu',
    xpReward: 75,
    category: 'coding',
    unlocked: false,
  },
  {
    id: 'focus-master',
    title: 'Focus Master',
    description: 'Complete a timed focus study sprint on the dashboard.',
    icon: 'Clock',
    xpReward: 60,
    category: 'productivity',
    unlocked: false,
  },
  {
    id: 'task-crusher',
    title: 'Task Crusher',
    description: 'Mark 3 or more study tasks as completed in your study planner.',
    icon: 'CheckCircle2',
    xpReward: 50,
    category: 'productivity',
    unlocked: false,
  },
]

export const XP_PER_LEVEL = 200

export function calculateLevelFromXp(xp: number): {
  level: number
  currentLevelXp: number
  nextLevelXp: number
  progressPercentage: number
} {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const currentLevelXp = xp % XP_PER_LEVEL
  const nextLevelXp = XP_PER_LEVEL
  const progressPercentage = Math.min(100, Math.round((currentLevelXp / nextLevelXp) * 100))

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    progressPercentage,
  }
}
