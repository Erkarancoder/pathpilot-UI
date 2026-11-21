import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OnboardingHeader } from '../components/onboarding/OnboardingHeader'
import { StepWelcome } from '../components/onboarding/StepWelcome'
import { StepProfile } from '../components/onboarding/StepProfile'
import { StepGoals } from '../components/onboarding/StepGoals'
import { StepSkills } from '../components/onboarding/StepSkills'
import { StepAssessment } from '../components/onboarding/StepAssessment'
import { StepResult } from '../components/onboarding/StepResult'
import { StepCompletion } from '../components/onboarding/StepCompletion'
import { saveOnboardingData, getOnboardingData } from '../lib/storage'
import { DEGREE_OPTIONS, YEAR_SEMESTER_OPTIONS } from '../data/assessmentData'
import type { OnboardingData, SkillLevel, AssessmentResult } from '../types'

const STEP_TITLES: Record<number, string> = {
  1: 'Welcome & Overview',
  2: 'Academic Profile',
  3: 'Learning Goals',
  4: 'Skills & Stack',
  5: 'Skill Assessment',
  6: 'Assessment Results',
  7: 'Onboarding Complete',
}

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<OnboardingData>(() => {
    const saved = getOnboardingData()
    if (saved) return saved
    return {
      fullName: '',
      collegeName: '',
      degree: DEGREE_OPTIONS[0],
      yearOrSemester: YEAR_SEMESTER_OPTIONS[2],
      avatarInitials: 'ST',
      learningGoals: [
        'Become a Full Stack Developer',
        'Improve DSA and problem solving',
      ],
      experienceLevel: 'Intermediate',
      selectedSkills: ['HTML/CSS', 'JavaScript', 'Python', 'Git and GitHub'],
      completed: false,
    }
  })

  const [currentStep, setCurrentStep] = useState<number>(() => {
    const saved = getOnboardingData()
    if (saved?.completed && saved.assessmentResult) return 7
    return 1
  })

  const handleProfileSave = (profileData: {
    fullName: string
    collegeName: string
    degree: string
    yearOrSemester: string
    avatarInitials: string
  }) => {
    const updated = { ...formData, ...profileData }
    setFormData(updated)
    saveOnboardingData(updated)
    setCurrentStep(3)
  }

  const handleGoalsSave = (goals: string[]) => {
    const updated = { ...formData, learningGoals: goals }
    setFormData(updated)
    saveOnboardingData(updated)
    setCurrentStep(4)
  }

  const handleSkillsSave = (level: SkillLevel, skills: string[]) => {
    const updated = { ...formData, experienceLevel: level, selectedSkills: skills }
    setFormData(updated)
    saveOnboardingData(updated)
    setCurrentStep(5)
  }

  const handleAssessmentComplete = (result: AssessmentResult) => {
    const updated: OnboardingData = {
      ...formData,
      assessmentResult: result,
      completed: true,
    }
    setFormData(updated)
    saveOnboardingData(updated)
    setCurrentStep(6)
  }

  const handleFinish = () => {
    const finalData = { ...formData, completed: true }
    saveOnboardingData(finalData)
    navigate('/dashboard')
  }

  const handleRetake = () => {
    setCurrentStep(2)
  }

  return (
    <div className="min-h-screen bg-[#090817] text-[#F7F3FF] flex flex-col selection:bg-[#F02BC8] selection:text-white">
      {/* Background ambient lighting glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#9255FF]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#F02BC8]/10 rounded-full blur-[160px]" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-[#211C50]/25 rounded-full blur-[180px]" />
      </div>

      {/* Progress Header */}
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={7}
        stepTitle={STEP_TITLES[currentStep] || 'Setup'}
      />

      {/* Main Step Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10 flex flex-col justify-center">
        {currentStep === 1 && (
          <StepWelcome onNext={() => setCurrentStep(2)} />
        )}

        {currentStep === 2 && (
          <StepProfile
            initialData={{
              fullName: formData.fullName,
              collegeName: formData.collegeName,
              degree: formData.degree,
              yearOrSemester: formData.yearOrSemester,
              avatarInitials: formData.avatarInitials,
            }}
            onSave={handleProfileSave}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <StepGoals
            initialGoals={formData.learningGoals}
            onSave={handleGoalsSave}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <StepSkills
            initialLevel={formData.experienceLevel}
            initialSkills={formData.selectedSkills}
            onSave={handleSkillsSave}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <StepAssessment
            initialAnswers={formData.assessmentResult?.answers || {}}
            onComplete={handleAssessmentComplete}
            onBack={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 6 && formData.assessmentResult && (
          <StepResult
            result={formData.assessmentResult}
            learningGoals={formData.learningGoals}
            onNext={() => setCurrentStep(7)}
          />
        )}

        {currentStep === 7 && (
          <StepCompletion
            data={formData}
            onFinish={handleFinish}
            onRetake={handleRetake}
          />
        )}
      </main>
    </div>
  )
}
