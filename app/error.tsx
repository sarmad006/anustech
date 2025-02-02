'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { HardHat, AlertTriangle, Home, RefreshCw } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string; statusCode?: number }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps): React.ReactElement {
  const router = useRouter()

  useEffect(() => {
    console.error('Runtime Error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      statusCode: error.statusCode
    })
  }, [error])

  const getErrorMessage = (): string => {
    if (error.statusCode === 404) return 'הדף המבוקש לא נמצא'
    if (error.statusCode === 403) return 'אין לך הרשאה לצפות בתוכן זה'
    if (error.statusCode === 500) return 'אירעה שגיאה בשרת'
    return 'משהו השתבש! אנא נסו שוב.'
  }

const getErrorDescription = (): string => {
if (error.statusCode === 404) return 'הדף שחיפשת לא נמצא. כמו בעבודה בגובה, חשוב לוודא שאנחנו במקום הנכון. בוא ננווט חזרה לדרך הבטוחה.'
if (error.statusCode === 403) return 'אין לך גישה לדף זה. בטיחות מעל הכל - אזור זה דורש הרשאות מתאימות.'
if (error.statusCode === 500) return 'אירעה שגיאה בשרת. כמו בציוד בטיחות תקול, צוות התמיכה שלנו כבר מטפל בבעיה.'
return 'אירעה שגיאה בלתי צפויה. כמו בעבודה בגובה, לפעמים יש תקלות - אבל תמיד יש פתרון בטוח.'
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
        <div className="absolute top-4 left-4 opacity-10">
          <HardHat size={120} />
        </div>

        <div className="relative z-10 text-center space-y-6" role="alert" aria-live="polite">
        {/* Error Icon */}
        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center" aria-hidden="true">
            <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              {getErrorMessage()}
            </h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              {getErrorDescription()}
            </p>
          </div>

          {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 gap-2 group"
            aria-label="נסה שוב לטעון את הדף"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              נסו שוב
            </button>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 gap-2"
            >
              <Home className="w-5 h-5" />
              חזרה לדף הבית
            </button>
          </div>

          {/* Error Code */}
          {error.digest && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <span>קוד שגיאה:</span>
                <code className="px-2 py-1 bg-gray-100 rounded-md font-mono">
                  {error.digest}
                </code>
              </p>
            </div>
          )}

          {/* Safety Tip */}
          <div className="mt-8 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg inline-block mx-auto">
            <p className="flex items-center gap-2">
              <HardHat className="w-4 h-4 text-blue-600" />
              <span>תמיד זכרו: בטיחות קודמת לכל - גם באינטרנט</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}