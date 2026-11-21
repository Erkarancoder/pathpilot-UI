import type {
  OnboardingData,
  StudentProfile,
  StudyTask,
  StudySession,
  NotificationItem,
  PracticeQuizAttempt,
  SolvedCodingProblem,
  ChatMessage,
  SavedStudyPlan,
  GamificationState,
  AchievementBadge,
} from '../types'
import { mockStudentProfile } from '../data/demoData'
import { LEARNING_PATHS } from '../data/roadmapData'
import { INITIAL_BADGES, calculateLevelFromXp } from '../data/gamificationData'

const PROFILE_KEY = 'pathpilot_student_profile'
const ONBOARDING_STATUS_KEY = 'pathpilot_onboarding_completed'
const TASKS_KEY = 'pathpilot_study_tasks'
const SESSIONS_KEY = 'pathpilot_study_sessions'
const NOTIFICATIONS_KEY = 'pathpilot_notifications'
const COMPLETED_LESSONS_KEY = 'pathpilot_completed_lessons'
const ACTIVE_ROADMAP_KEY = 'pathpilot_active_roadmap'
const PRACTICE_ATTEMPTS_KEY = 'pathpilot_practice_attempts'
const PRACTICE_CODING_KEY = 'pathpilot_practice_coding_solutions'
const MENTOR_CHAT_KEY = 'pathpilot_mentor_messages'
const STUDY_PLAN_KEY = 'pathpilot_saved_study_plan'
const GAMIFICATION_KEY = 'pathpilot_gamification_state'

/* --- ONBOARDING & PROFILE --- */
export function saveOnboardingData(data: OnboardingData): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
    if (data.completed) {
      localStorage.setItem(ONBOARDING_STATUS_KEY, 'true')
    }
  } catch (e) {
    console.warn('Failed to save onboarding data:', e)
  }
}

export function getOnboardingData(): OnboardingData | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as OnboardingData
  } catch (e) {
    console.warn('Failed to parse onboarding data:', e)
    return null
  }
}

export function isOnboardingCompleted(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_STATUS_KEY) === 'true'
  } catch {
    return false
  }
}

export function clearOnboardingData(): void {
  try {
    localStorage.removeItem(PROFILE_KEY)
    localStorage.removeItem(ONBOARDING_STATUS_KEY)
    localStorage.removeItem(TASKS_KEY)
    localStorage.removeItem(SESSIONS_KEY)
    localStorage.removeItem(NOTIFICATIONS_KEY)
    localStorage.removeItem(COMPLETED_LESSONS_KEY)
    localStorage.removeItem(ACTIVE_ROADMAP_KEY)
    localStorage.removeItem(PRACTICE_ATTEMPTS_KEY)
    localStorage.removeItem(PRACTICE_CODING_KEY)
    localStorage.removeItem(MENTOR_CHAT_KEY)
    localStorage.removeItem(STUDY_PLAN_KEY)
    localStorage.removeItem(GAMIFICATION_KEY)
  } catch (e) {
    console.warn('Failed to clear data:', e)
  }
}

/* --- STUDY TASKS (PHASE 4 PLANNER) --- */
const DEFAULT_TASKS: StudyTask[] = [
  {
    id: 'task-1',
    title: 'Review Dijkstra Min-Heap Proof & Lemma 4',
    course: 'CS 161',
    priority: 'High',
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Implement BFS Shortest Path in Python & run test suite',
    course: 'CS 161',
    priority: 'High',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Review SQL Indexing & B+ Trees chapter notes',
    course: 'Databases',
    priority: 'Medium',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
]

export function getStudyTasks(): StudyTask[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY)
    if (!raw) {
      // Initialize with default tasks on first load
      localStorage.setItem(TASKS_KEY, JSON.stringify(DEFAULT_TASKS))
      return DEFAULT_TASKS
    }
    return JSON.parse(raw) as StudyTask[]
  } catch (e) {
    console.warn('Failed to parse study tasks:', e)
    return DEFAULT_TASKS
  }
}

export function saveStudyTasks(tasks: StudyTask[]): void {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  } catch (e) {
    console.warn('Failed to save study tasks:', e)
  }
}

export function addStudyTask(
  task: Omit<StudyTask, 'id' | 'createdAt'>
): StudyTask[] {
  const current = getStudyTasks()
  const newTask: StudyTask = {
    ...task,
    id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    completed: task.completed ?? false,
    createdAt: new Date().toISOString(),
  }
  const updated = [newTask, ...current]
  saveStudyTasks(updated)
  return updated
}

export function updateStudyTask(
  id: string,
  updates: Partial<StudyTask>
): StudyTask[] {
  const current = getStudyTasks()
  const updated = current.map((t) => (t.id === id ? { ...t, ...updates } : t))
  saveStudyTasks(updated)
  return updated
}

export function toggleStudyTask(id: string): StudyTask[] {
  const current = getStudyTasks()
  const updated = current.map((t) => {
    if (t.id === id) {
      const willBeCompleted = !t.completed
      return {
        ...t,
        completed: willBeCompleted,
        completedAt: willBeCompleted ? new Date().toISOString() : undefined,
      }
    }
    return t
  })
  saveStudyTasks(updated)
  return updated
}

export function deleteStudyTask(id: string): StudyTask[] {
  const current = getStudyTasks()
  const updated = current.filter((t) => t.id !== id)
  saveStudyTasks(updated)
  return updated
}

/* --- STUDY SESSIONS & SPRINT LOGGING --- */
const DEFAULT_SESSIONS: StudySession[] = [
  {
    id: 'sess-1',
    durationMinutes: 25,
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    topic: 'Graph Traversals',
  },
  {
    id: 'sess-2',
    durationMinutes: 50,
    date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    topic: 'Dijkstra Min-Heap',
  },
  {
    id: 'sess-3',
    durationMinutes: 25,
    date: new Date().toISOString().split('T')[0],
    topic: 'Problem Set 4 Proofs',
  },
]

export function getStudySessions(): StudySession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY)
    if (!raw) {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(DEFAULT_SESSIONS))
      return DEFAULT_SESSIONS
    }
    return JSON.parse(raw) as StudySession[]
  } catch (e) {
    console.warn('Failed to parse sessions:', e)
    return DEFAULT_SESSIONS
  }
}

export function logStudySession(durationMinutes: number, topic?: string): StudySession {
  const current = getStudySessions()
  const newSession: StudySession = {
    id: `sess-${Date.now()}`,
    durationMinutes,
    date: new Date().toISOString().split('T')[0],
    topic: topic || 'Sprint Study Session',
  }
  const updated = [newSession, ...current]
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated))
  } catch (e) {
    console.warn('Failed to save session:', e)
  }
  return newSession
}

/**
 * Calculates genuine consecutive study streak from recorded sessions and completed tasks
 */
export function calculateRealStreak(): number {
  const sessions = getStudySessions()
  const tasks = getStudyTasks().filter((t) => t.completed && t.completedAt)

  // Collect unique active YYYY-MM-DD dates
  const activeDates = new Set<string>()
  sessions.forEach((s) => activeDates.add(s.date))
  tasks.forEach((t) => {
    if (t.completedAt) {
      activeDates.add(t.completedAt.split('T')[0])
    }
  })

  if (activeDates.size === 0) return 0

  let streak = 0
  const today = new Date()

  // Count backwards from today
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    if (activeDates.has(dateStr)) {
      streak++
    } else if (i === 0) {
      // If user hasn't logged today yet, check yesterday to continue streak
      continue
    } else {
      break
    }
  }

  return streak > 0 ? streak : 1
}

/* --- NOTIFICATIONS --- */
const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Assignment Due Soon',
    message: 'Problem Set 4 (Shortest Paths) is due this Friday at 11:59 PM.',
    time: '2 hours ago',
    read: false,
    type: 'exam',
  },
  {
    id: 'notif-2',
    title: 'Sprint Complete',
    message: 'Great job! You completed your 25-minute study sprint on Graph Traversals.',
    time: '4 hours ago',
    read: false,
    type: 'streak',
  },
  {
    id: 'notif-3',
    title: 'Curriculum Synchronized',
    message: 'Course milestones for CS 161 and Databases were updated for Week 6.',
    time: 'Yesterday',
    read: true,
    type: 'system',
  },
]

export function getNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY)
    if (!raw) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS))
      return DEFAULT_NOTIFICATIONS
    }
    return JSON.parse(raw) as NotificationItem[]
  } catch (e) {
    console.warn('Failed to parse notifications:', e)
    return DEFAULT_NOTIFICATIONS
  }
}

export function saveNotifications(notifications: NotificationItem[]): void {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications))
  } catch (e) {
    console.warn('Failed to save notifications:', e)
  }
}

export function markAllNotificationsAsRead(): NotificationItem[] {
  const current = getNotifications()
  const updated = current.map((n) => ({ ...n, read: true }))
  saveNotifications(updated)
  return updated
}

export function dismissNotification(id: string): NotificationItem[] {
  const current = getNotifications()
  const updated = current.filter((n) => n.id !== id)
  saveNotifications(updated)
  return updated
}

/* --- ACTIVE STUDENT PROFILE --- */
export function getActiveStudentProfile(): StudentProfile {
  const onboarding = getOnboardingData()
  const streak = calculateRealStreak()
  const notifications = getNotifications()
  const unreadCount = notifications.filter((n) => !n.read).length

  if (onboarding && onboarding.fullName) {
    return {
      name: onboarding.fullName,
      email: `${onboarding.fullName.toLowerCase().replace(/\s+/g, '.')}@${onboarding.collegeName
        ? onboarding.collegeName.toLowerCase().replace(/[^a-z0-9]/g, '')
        : 'campus'
        }.edu`,
      major: onboarding.degree || 'Computer Science',
      year: onboarding.yearOrSemester || 'Junior, Class of 2026',
      college: onboarding.collegeName,
      gpa: 3.89,
      streakDays: streak,
      notificationsCount: unreadCount,
    }
  }

  return {
    ...mockStudentProfile,
    streakDays: streak,
    notificationsCount: unreadCount,
  }
}

/* --- ROADMAP & LESSON COMPLETIONS (PHASE 5) --- */
const DEFAULT_COMPLETED_LESSONS: string[] = ['fs-les-1', 'fs-les-2']

export function getCompletedLessons(): string[] {
  try {
    const raw = localStorage.getItem(COMPLETED_LESSONS_KEY)
    if (!raw) {
      localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(DEFAULT_COMPLETED_LESSONS))
      return DEFAULT_COMPLETED_LESSONS
    }
    return JSON.parse(raw) as string[]
  } catch (e) {
    console.warn('Failed to parse completed lessons:', e)
    return DEFAULT_COMPLETED_LESSONS
  }
}

export function saveCompletedLessons(lessons: string[]): void {
  try {
    const unique = Array.from(new Set(lessons))
    localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(unique))
  } catch (e) {
    console.warn('Failed to save completed lessons:', e)
  }
}

export function toggleLessonCompleted(lessonId: string): string[] {
  const current = getCompletedLessons()
  const exists = current.includes(lessonId)
  const updated = exists ? current.filter((id) => id !== lessonId) : [...current, lessonId]
  saveCompletedLessons(updated)
  return updated
}

export function isLessonCompleted(lessonId: string): boolean {
  const current = getCompletedLessons()
  return current.includes(lessonId)
}

export function getRecommendedPathIds(onboardingGoals?: string[]): string[] {
  if (!onboardingGoals || onboardingGoals.length === 0) {
    return ['full-stack', 'dsa']
  }

  const result: string[] = []
  onboardingGoals.forEach((goal) => {
    const g = goal.toLowerCase()
    if (g.includes('full stack') || g.includes('web')) {
      if (!result.includes('full-stack')) result.push('full-stack')
    }
    if (g.includes('dsa') || g.includes('problem solving') || g.includes('data structures')) {
      if (!result.includes('dsa')) result.push('dsa')
    }
    if (g.includes('ai') || g.includes('machine learning')) {
      if (!result.includes('ai-ml')) result.push('ai-ml')
    }
    if (g.includes('fundamentals') || g.includes('programming fundamentals')) {
      if (!result.includes('programming-fundamentals')) result.push('programming-fundamentals')
    }
    if (g.includes('internship') || g.includes('placement')) {
      if (!result.includes('placement-prep')) result.push('placement-prep')
    }
  })

  return result.length > 0 ? result : ['full-stack']
}

export function getActiveRoadmapId(): string {
  try {
    const saved = localStorage.getItem(ACTIVE_ROADMAP_KEY)
    if (saved) return saved

    // Default to student's recommended onboarding goal if exists
    const onboarding = getOnboardingData()
    if (onboarding?.learningGoals && onboarding.learningGoals.length > 0) {
      const recommended = getRecommendedPathIds(onboarding.learningGoals)
      if (recommended.length > 0) {
        localStorage.setItem(ACTIVE_ROADMAP_KEY, recommended[0])
        return recommended[0]
      }
    }

    return 'full-stack'
  } catch {
    return 'full-stack'
  }
}

export function setActiveRoadmapId(pathId: string): void {
  try {
    localStorage.setItem(ACTIVE_ROADMAP_KEY, pathId)
  } catch (e) {
    console.warn('Failed to save active roadmap:', e)
  }
}

export function resetRoadmapProgress(pathId?: string): void {
  try {
    if (!pathId) {
      localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify([]))
    } else {
      const current = getCompletedLessons()
      const path = LEARNING_PATHS.find((p) => p.id === pathId)
      if (path) {
        const pathLessonIds = new Set(
          path.modules.flatMap((m) => m.lessons.map((l) => l.id))
        )
        const updated = current.filter((id) => !pathLessonIds.has(id))
        localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(updated))
      }
    }
  } catch (e) {
    console.warn('Failed to reset roadmap progress:', e)
  }
}

export function getRoadmapProgress(pathId: string) {
  const path = LEARNING_PATHS.find((p) => p.id === pathId) || LEARNING_PATHS[0]
  const completed = getCompletedLessons()
  const allLessons = path.modules.flatMap((m) => m.lessons)
  const totalCount = allLessons.length
  const completedCount = allLessons.filter((l) => completed.includes(l.id)).length
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  // Find next incomplete lesson
  let nextLesson = undefined
  let nextModule = undefined

  for (const module of path.modules) {
    for (const lesson of module.lessons) {
      if (!completed.includes(lesson.id)) {
        nextLesson = lesson
        nextModule = module
        break
      }
    }
    if (nextLesson) break
  }

  return {
    path,
    completedCount,
    totalCount,
    percentage,
    nextLesson,
    nextModule,
    isAllCompleted: completedCount === totalCount && totalCount > 0,
  }
}

/* --- PRACTICE LAB & QUIZ ATTEMPTS (PHASE 6) --- */
const DEFAULT_PRACTICE_ATTEMPTS: PracticeQuizAttempt[] = [
  {
    id: 'att-init-1',
    categoryId: 'dsa',
    categoryTitle: 'Data Structures & Algorithms',
    difficulty: 'Beginner',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    answers: { 'dsa-q1': 2, 'dsa-q2': 1, 'dsa-q3': 1, 'dsa-q4': 1, 'dsa-q5': 0 },
    completedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'att-init-2',
    categoryId: 'java',
    categoryTitle: 'Java',
    difficulty: 'Intermediate',
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    answers: { 'java-q1': 1, 'java-q2': 1, 'java-q3': 1, 'java-q4': 2, 'java-q5': 2 },
    completedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
]

export function getPracticeQuizAttempts(): PracticeQuizAttempt[] {
  try {
    const raw = localStorage.getItem(PRACTICE_ATTEMPTS_KEY)
    if (!raw) {
      localStorage.setItem(PRACTICE_ATTEMPTS_KEY, JSON.stringify(DEFAULT_PRACTICE_ATTEMPTS))
      return DEFAULT_PRACTICE_ATTEMPTS
    }
    return JSON.parse(raw) as PracticeQuizAttempt[]
  } catch (e) {
    console.warn('Failed to parse practice attempts:', e)
    return DEFAULT_PRACTICE_ATTEMPTS
  }
}

export function savePracticeQuizAttempt(
  attempt: Omit<PracticeQuizAttempt, 'id' | 'completedAt'>
): PracticeQuizAttempt {
  const current = getPracticeQuizAttempts()
  const newAttempt: PracticeQuizAttempt = {
    ...attempt,
    id: `attempt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    completedAt: new Date().toISOString(),
  }
  const updated = [newAttempt, ...current]
  try {
    localStorage.setItem(PRACTICE_ATTEMPTS_KEY, JSON.stringify(updated))
  } catch (e) {
    console.warn('Failed to save practice attempt:', e)
  }
  return newAttempt
}

export function getPracticeCodingSolutions(): SolvedCodingProblem[] {
  try {
    const raw = localStorage.getItem(PRACTICE_CODING_KEY)
    if (!raw) return []
    return JSON.parse(raw) as SolvedCodingProblem[]
  } catch (e) {
    console.warn('Failed to parse coding solutions:', e)
    return []
  }
}

export function savePracticeCodingSolution(solution: SolvedCodingProblem): SolvedCodingProblem[] {
  const current = getPracticeCodingSolutions()
  const filtered = current.filter((s) => s.problemId !== solution.problemId)
  const updated = [solution, ...filtered]
  try {
    localStorage.setItem(PRACTICE_CODING_KEY, JSON.stringify(updated))
  } catch (e) {
    console.warn('Failed to save coding solution:', e)
  }
  return updated
}

export function resetPracticeHistory(): void {
  try {
    localStorage.setItem(PRACTICE_ATTEMPTS_KEY, JSON.stringify([]))
    localStorage.setItem(PRACTICE_CODING_KEY, JSON.stringify([]))
  } catch (e) {
    console.warn('Failed to reset practice history:', e)
  }
}

export function getPracticeStats() {
  const attempts = getPracticeQuizAttempts()
  const codingSolutions = getPracticeCodingSolutions()

  const totalQuizzesCompleted = attempts.length
  let totalScore = 0
  let totalQuestions = 0

  const categoryStats: Record<string, { attempts: number; score: number; total: number; percentage: number }> = {}

  attempts.forEach((att) => {
    totalScore += att.score
    totalQuestions += att.totalQuestions

    if (!categoryStats[att.categoryId]) {
      categoryStats[att.categoryId] = { attempts: 0, score: 0, total: 0, percentage: 0 }
    }
    categoryStats[att.categoryId].attempts += 1
    categoryStats[att.categoryId].score += att.score
    categoryStats[att.categoryId].total += att.totalQuestions
  })

  Object.keys(categoryStats).forEach((catId) => {
    const cat = categoryStats[catId]
    cat.percentage = cat.total > 0 ? Math.round((cat.score / cat.total) * 100) : 0
  })

  const accuracyPercentage = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0
  const totalCodingSolved = codingSolutions.filter((s) => s.passed).length

  return {
    totalQuizzesCompleted,
    totalQuestionsAttempted: totalQuestions,
    totalCorrectAnswers: totalScore,
    accuracyPercentage,
    totalCodingSolved,
    categoryStats,
    recentAttempts: attempts.slice(0, 5),
  }
}

/* --- PHASE 7: AI MENTOR CHAT HISTORY --- */
export function getMentorChatHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(MENTOR_CHAT_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ChatMessage[]
  } catch (e) {
    console.warn('Failed to parse mentor chat history:', e)
    return []
  }
}

export function saveMentorChatHistory(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(MENTOR_CHAT_KEY, JSON.stringify(messages))
  } catch (e) {
    console.warn('Failed to save mentor chat history:', e)
  }
}

export function clearMentorChatHistory(): void {
  try {
    localStorage.removeItem(MENTOR_CHAT_KEY)
  } catch (e) {
    console.warn('Failed to clear mentor chat history:', e)
  }
}

/* --- PHASE 7: STUDY PLAN GENERATOR & STORAGE --- */
export function getSavedStudyPlan(): SavedStudyPlan | null {
  try {
    const raw = localStorage.getItem(STUDY_PLAN_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SavedStudyPlan
  } catch (e) {
    console.warn('Failed to parse saved study plan:', e)
    return null
  }
}

export function saveSavedStudyPlan(plan: SavedStudyPlan): void {
  try {
    localStorage.setItem(STUDY_PLAN_KEY, JSON.stringify(plan))
  } catch (e) {
    console.warn('Failed to save study plan:', e)
  }
}

/* --- PHASE 7: GAMIFICATION (XP, BADGES, REAL STREAK) --- */
export function getGamificationState(): GamificationState {
  const onboarding = getOnboardingData()
  const completedLessons = getCompletedLessons()
  const tasks = getStudyTasks()
  const sessions = getStudySessions()
  const attempts = getPracticeQuizAttempts()
  const codingSolutions = getPracticeCodingSolutions()

  let totalXp = 0
  const completedActionIds: string[] = []

  // 1. Onboarding diagnostic completed (+50 XP)
  if (onboarding?.completed && onboarding.assessmentResult) {
    const actionId = 'onboarding-completed'
    if (!completedActionIds.includes(actionId)) {
      completedActionIds.push(actionId)
      totalXp += 50
    }
  }

  // 2. Roadmap lessons completed (+50 XP per unique lesson)
  completedLessons.forEach((lessonId) => {
    const actionId = `lesson-${lessonId}`
    if (!completedActionIds.includes(actionId)) {
      completedActionIds.push(actionId)
      totalXp += 50
    }
  })

  // 3. Completed study tasks (+25 XP per unique task)
  tasks.filter((t) => t.completed).forEach((t) => {
    const actionId = `task-${t.id}`
    if (!completedActionIds.includes(actionId)) {
      completedActionIds.push(actionId)
      totalXp += 25
    }
  })

  // 4. Completed study sessions (+40 XP per session)
  sessions.forEach((s) => {
    const actionId = `session-${s.id}`
    if (!completedActionIds.includes(actionId)) {
      completedActionIds.push(actionId)
      totalXp += 40
    }
  })

  // 5. Solved DSA coding problems (+75 XP per unique problem)
  codingSolutions.filter((c) => c.passed).forEach((c) => {
    const actionId = `coding-${c.problemId}`
    if (!completedActionIds.includes(actionId)) {
      completedActionIds.push(actionId)
      totalXp += 75
    }
  })

  // 6. Practice quiz attempts (+30 XP base, +20 XP bonus if >= 80%)
  attempts.forEach((att) => {
    const actionId = `quiz-${att.id}`
    if (!completedActionIds.includes(actionId)) {
      completedActionIds.push(actionId)
      totalXp += 30
      if (att.percentage >= 80) {
        totalXp += 20
      }
    }
  })

  // Calculate Level & Next Level Target
  const levelInfo = calculateLevelFromXp(totalXp)

  // Evaluate Badges from Authentic Real Data
  const badges: AchievementBadge[] = INITIAL_BADGES.map((b) => {
    let unlocked = false
    let unlockedAt: string | undefined = undefined

    switch (b.id) {
      case 'first-step':
        unlocked = !!(onboarding?.completed && onboarding.assessmentResult)
        if (unlocked && onboarding?.assessmentResult?.completedAt) {
          unlockedAt = onboarding.assessmentResult.completedAt
        }
        break

      case 'curious-mind':
        unlocked = completedLessons.length >= 1
        break

      case 'roadmap-scholar':
        unlocked = completedLessons.length >= 3
        break

      case 'quiz-apprentice':
        unlocked = attempts.length >= 1
        if (unlocked && attempts[0]?.completedAt) {
          unlockedAt = attempts[0].completedAt
        }
        break

      case 'sharpshooter':
        unlocked = attempts.some((att) => att.percentage === 100)
        break

      case 'code-pioneer':
        unlocked = codingSolutions.some((c) => c.passed)
        if (unlocked && codingSolutions[0]?.solvedAt) {
          unlockedAt = codingSolutions[0].solvedAt
        }
        break

      case 'polyglot-coder': {
        const passedLangs = new Set(codingSolutions.filter((c) => c.passed).map((c) => c.language))
        unlocked = passedLangs.size >= 2
        break
      }

      case 'focus-master':
        unlocked = sessions.length >= 1
        break

      case 'task-crusher':
        unlocked = tasks.filter((t) => t.completed).length >= 3
        break

      default:
        unlocked = false
    }

    return {
      ...b,
      unlocked,
      unlockedAt,
    }
  })

  // Real streak calculation:
  // Count unique active days with recorded sessions, quiz attempts, or completed tasks
  const activeDates = new Set<string>()
  sessions.forEach((s) => activeDates.add(s.date))
  attempts.forEach((a) => activeDates.add(a.completedAt.split('T')[0]))
  tasks.filter((t) => t.completed && t.completedAt).forEach((t) => {
    if (t.completedAt) activeDates.add(t.completedAt.split('T')[0])
  })

  // Base streak minimum: if student profile already had a starting baseline (e.g. 14 from mock),
  // add the unique active session dates, or default to active dates count + 1 if today has activity
  const todayStr = new Date().toISOString().split('T')[0]
  const hasActivityToday = activeDates.has(todayStr)
  const streakDays = Math.max(hasActivityToday ? 1 : 0, activeDates.size > 0 ? activeDates.size : (onboarding?.completed ? 1 : 0))

  const state: GamificationState = {
    xp: totalXp,
    level: levelInfo.level,
    nextLevelXp: levelInfo.nextLevelXp,
    streakDays,
    badges,
    completedActionIds,
  }

  try {
    localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Failed to save gamification state:', e)
  }

  return state
}


