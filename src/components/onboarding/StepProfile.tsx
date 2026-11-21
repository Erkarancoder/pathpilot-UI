import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, User, School, GraduationCap, Calendar } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { DEGREE_OPTIONS, YEAR_SEMESTER_OPTIONS } from '../../data/assessmentData'

interface StepProfileProps {
  initialData: {
    fullName: string
    collegeName: string
    degree: string
    yearOrSemester: string
    avatarInitials: string
  }
  onSave: (data: {
    fullName: string
    collegeName: string
    degree: string
    yearOrSemester: string
    avatarInitials: string
  }) => void
  onBack: () => void
}

export const StepProfile: React.FC<StepProfileProps> = ({
  initialData,
  onSave,
  onBack,
}) => {
  const [fullName, setFullName] = useState(initialData.fullName || '')
  const [collegeName, setCollegeName] = useState(initialData.collegeName || '')
  const [degree, setDegree] = useState(initialData.degree || DEGREE_OPTIONS[0])
  const [yearOrSemester, setYearOrSemester] = useState(
    initialData.yearOrSemester || YEAR_SEMESTER_OPTIONS[2]
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const getInitials = (name: string): string => {
    if (!name.trim()) return 'ST'
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const handleNext = () => {
    const newErrors: Record<string, string> = {}
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters)'
    }
    if (!collegeName.trim() || collegeName.trim().length < 2) {
      newErrors.collegeName = 'Please enter your college or university name'
    }
    if (!degree) {
      newErrors.degree = 'Please select your academic degree or program'
    }
    if (!yearOrSemester) {
      newErrors.yearOrSemester = 'Please select your current academic year or semester'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSave({
        fullName: fullName.trim(),
        collegeName: collegeName.trim(),
        degree,
        yearOrSemester,
        avatarInitials: getInitials(fullName),
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Step 2: Student Academic Profile</CardTitle>
              <CardDescription>
                Tell us where you study and what degree you are pursuing so we can align your roadmap.
              </CardDescription>
            </div>
            {/* Live Avatar Preview */}
            <div className="relative group shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] p-0.5 shadow-[0_0_15px_rgba(240,43,200,0.35)]">
                <div className="w-full h-full rounded-[10px] bg-[#171536] flex items-center justify-center font-bold text-sm text-[#F7F3FF]">
                  {getInitials(fullName)}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Full Name */}
          <Input
            label="Full Name"
            placeholder="e.g. Alex Chen"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              if (errors.fullName) {
                setErrors((prev) => ({ ...prev, fullName: '' }))
              }
            }}
            error={errors.fullName}
            leftIcon={<User className="w-4 h-4" />}
            helperText="Used to personalize your study certificates and streak dashboard"
          />

          {/* College Name */}
          <Input
            label="College or University Name"
            placeholder="e.g. Stanford University / Tech Institute"
            value={collegeName}
            onChange={(e) => {
              setCollegeName(e.target.value)
              if (errors.collegeName) {
                setErrors((prev) => ({ ...prev, collegeName: '' }))
              }
            }}
            error={errors.collegeName}
            leftIcon={<School className="w-4 h-4" />}
            helperText="Helps match course codes and semester timelines"
          />

          {/* Degree / Program */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]">
              Degree / Program
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-[#A7A0C5]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="h-11 w-full rounded-xl bg-[#171536] pl-10 pr-4 text-sm text-[#F7F3FF] border border-[rgba(146,85,255,0.22)] focus:border-[#F02BC8] focus:ring-2 focus:ring-[#F02BC8]/25 outline-none transition-all cursor-pointer"
              >
                {DEGREE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#171536] text-[#F7F3FF]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Current Year / Semester */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]">
              Current Academic Year / Semester
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-[#A7A0C5]">
                <Calendar className="w-4 h-4" />
              </div>
              <select
                value={yearOrSemester}
                onChange={(e) => setYearOrSemester(e.target.value)}
                className="h-11 w-full rounded-xl bg-[#171536] pl-10 pr-4 text-sm text-[#F7F3FF] border border-[rgba(146,85,255,0.22)] focus:border-[#F02BC8] focus:ring-2 focus:ring-[#F02BC8]/25 outline-none transition-all cursor-pointer"
              >
                {YEAR_SEMESTER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#171536] text-[#F7F3FF]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="pt-4 border-t border-[rgba(146,85,255,0.12)] flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={handleNext}
            >
              Next: Learning Goals
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
