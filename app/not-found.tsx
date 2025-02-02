'use client'

import Link from 'next/link'
import { HardHat, ChevronRight, Home, ArrowLeft } from 'lucide-react'

export default function NotFound(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
        <div className="absolute top-4 left-4 opacity-10">
          <HardHat size={120} />
        </div>

        <div className="relative z-10 text-center space-y-6">
          {/* 404 Display */}
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-100">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <HardHat className="w-20 h-20 text-blue-600" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 py-6">
            <h2 className="text-3xl font-bold text-gray-900">
              אזור העבודה לא נמצא
            </h2>
            <div className="space-y-2 text-gray-600">
              <p className="text-lg">
                כמו באתר בנייה, חשוב להיות במקום הנכון.
              </p>
              <p>
                הדף המבוקש לא קיים או הועבר למיקום אחר.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              חזרה לדף הקודם
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 gap-2 w-full sm:w-auto"
            >
              <Home className="w-5 h-5" />
              חזרה לדף הבית
            </Link>
          </div>

          {/* Safety Tip */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg inline-block">
              <p className="flex items-center gap-2 justify-center" dir="rtl">
                <HardHat className="w-4 h-4 text-blue-600" />
                <span>זכרו תמיד: בטיחות מתחילה בניווט נכון</span>
              </p>
            </div>
          </div>

          {/* Navigation Breadcrumb */}
          <nav className="text-sm text-gray-500" dir="rtl">
            <ol className="flex justify-center items-center space-x-2 space-x-reverse">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">דף הבית</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li>404</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  )
}