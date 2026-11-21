import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { LandingPage } from './pages/LandingPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { DesignSystemPreview } from './pages/DesignSystemPreview'
import { Dashboard } from './pages/Dashboard'
import { RoadmapPage } from './pages/RoadmapPage'
import { PracticePage } from './pages/PracticePage'
import { MentorPage } from './pages/MentorPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Premium Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Student Onboarding & Skill Assessment */}
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Student Workspace Application Shell */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/design-system" element={<DesignSystemPreview />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
