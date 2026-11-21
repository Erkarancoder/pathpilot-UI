import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, RotateCcw } from 'lucide-react'
import { Button } from '../ui/Button'

interface ResetPracticeModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmReset: () => void
}

export const ResetPracticeModal: React.FC<ResetPracticeModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative z-10 w-full max-w-md rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-6 space-y-4 text-center overflow-hidden"
        >
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-1 text-[#A7A0C5] hover:text-[#F7F3FF] rounded-lg hover:bg-[#211C50]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-[#F7F3FF]">
              Reset Practice History?
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A0C5] leading-relaxed">
              This will clear all recorded quiz attempts, accuracy statistics, and saved coding problem solutions from your local storage.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                onConfirmReset()
                onClose()
              }}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Confirm Reset
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
