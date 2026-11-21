export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export type BadgeVariant = 'pink' | 'violet' | 'success' | 'warning' | 'neutral'
export type BadgeSize = 'sm' | 'md'

export type ProgressBarVariant = 'pink' | 'violet' | 'gradient' | 'success'
export type ProgressBarSize = 'sm' | 'md' | 'lg'

export type CardVariant = 'default' | 'elevated' | 'interactive' | 'accent-pink' | 'accent-violet'

export interface NavItem {
  id: string
  label: string
  path: string
  icon: string
  badge?: string
  isExternal?: boolean
}

export interface StudentProfile {
  name: string
  email: string
  avatarUrl?: string
  college?: string
  major: string
  year: string
  gpa: number
  streakDays: number
  notificationsCount: number
}

/* Phase 3 Onboarding & Skill Assessment Types */
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface AssessmentQuestion {
  id: number
  topic: string
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
}

export interface AssessmentResult {
  score: number
  totalQuestions: number
  percentage: number
  answers: Record<number, number>
  skillLevelSummary: string
  recommendation: string
  completedAt: string
}

export interface OnboardingData {
  fullName: string
  collegeName: string
  degree: string
  yearOrSemester: string
  avatarInitials: string
  learningGoals: string[]
  experienceLevel: SkillLevel
  selectedSkills: string[]
  assessmentResult?: AssessmentResult
  completed: boolean
}

/* Phase 4 Student Dashboard Types */
export type TaskPriority = 'High' | 'Medium' | 'Low'

export interface StudyTask {
  id: string
  title: string
  course: string
  priority: TaskPriority
  completed: boolean
  dueDate?: string
  estimatedMinutes?: number
  createdAt: string
  completedAt?: string
}

export interface StudySession {
  id: string
  durationMinutes: number
  date: string // YYYY-MM-DD
  topic?: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type?: 'task' | 'streak' | 'exam' | 'system'
}

/* Phase 5 Personalized Learning Roadmap Types */
export type LearningLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface LessonResource {
  title: string
  url: string
  type?: 'docs' | 'repo' | 'reference'
}

export interface Lesson {
  id: string
  title: string
  durationMinutes: number
  objective: string
  explanation: string
  practiceActivity: string
  resource?: LessonResource
}

export interface RoadmapModule {
  id: string
  title: string
  description: string
  level: LearningLevel
  order: number
  estimatedHours: number
  lessons: Lesson[]
  isLocked?: boolean
  prerequisites?: string[]
}

export interface LearningPath {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  icon: string
  targetGoal: string
  tags: string[]
  modules: RoadmapModule[]
}

/* Phase 6 Interactive Practice Lab Types */
export type PracticeCategory =
  | 'dsa'
  | 'java'
  | 'javascript'
  | 'react'
  | 'python'
  | 'html-css'
  | 'database'

export type PracticeDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface PracticeQuestion {
  id: string
  categoryId: PracticeCategory
  categoryTitle: string
  difficulty: PracticeDifficulty
  question: string
  codeSnippet?: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
}

export interface PracticeQuizAttempt {
  id: string
  categoryId: PracticeCategory
  categoryTitle: string
  difficulty: PracticeDifficulty
  score: number
  totalQuestions: number
  percentage: number
  answers: Record<string, number> // questionId -> selectedIndex
  completedAt: string
}

export interface CodingTestCase {
  id: string
  input: string
  expectedOutput: string
  explanation?: string
  isSample?: boolean
}

export type SupportedLanguage = 'java' | 'python' | 'javascript' | 'cpp'

export interface CodingProblem {
  id: string
  title: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  tags: string[]
  description: string
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  constraints: string[]
  testCases: CodingTestCase[]
  starterCode: Record<SupportedLanguage, string>
  expectedKeywords?: string[]
}

export interface SolvedCodingProblem {
  problemId: string
  language: SupportedLanguage
  code: string
  passed: boolean
  solvedAt: string
}

/* Phase 7 AI Mentor, Study Plan, Gamification & Performance Analytics */
export type MentorTopic =
  | 'dsa'
  | 'react'
  | 'study-plan'
  | 'interview'
  | 'quiz-mistakes'
  | 'next-steps'
  | 'python'
  | 'database'
  | 'general'

export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  topicTag?: string
  suggestedFollowUps?: string[]
  isDemoNotice?: boolean
}

export interface WeeklyStudyPlanItem {
  id: string
  day: string // Monday, Tuesday...
  topic: string
  suggestedDurationMinutes: number
  learningObjective: string
  practiceActivity: string
  completed?: boolean
}

export interface SavedStudyPlan {
  id: string
  generatedAt: string
  updatedAt: string
  goalTarget: string
  summary: string
  items: WeeklyStudyPlanItem[]
}

export type BadgeCategory = 'onboarding' | 'learning' | 'quiz' | 'coding' | 'productivity'

export interface AchievementBadge {
  id: string
  title: string
  description: string
  icon: string
  xpReward: number
  category: BadgeCategory
  unlocked: boolean
  unlockedAt?: string
}

export interface GamificationState {
  xp: number
  level: number
  nextLevelXp: number
  streakDays: number
  badges: AchievementBadge[]
  completedActionIds: string[]
}


