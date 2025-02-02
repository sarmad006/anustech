'use client'

import React from 'react'
import Link from 'next/link'
import { HardHat, AlertTriangle } from 'lucide-react'

export default function GlobalError({
error,
reset,
}: {
error: Error & { digest?: string }
reset: () => void
}): React.ReactElement {
return (
    <html lang="he">
    <body>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-red-600" />
            <div className="absolute top-4 left-4 opacity-10">
                <HardHat size={120} />
            </div>

            <div className="relative z-10 text-center space-y-6">
                {/* Error Icon */}
                <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>

                {/* Error Content */}
                <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    שגיאה קריטית
                </h1>
                <p className="text-lg text-gray-600">
                    אירעה שגיאה בלתי צפויה. צוות הפיתוח שלנו קיבל התראה ויטפל בבעיה בהקדם.
                </p>
                {error.digest && (
                    <p className="text-sm text-gray-500">
                    קוד שגיאה: <code className="px-2 py-1 bg-gray-100 rounded">{error.digest}</code>
                    </p>
                )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
                >
                    נסו שוב
                </button>
                <Link
                    href="/"
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                    חזרה לדף הבית
                </Link>
                </div>

                {/* Safety Message */}
                <div className="mt-8 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
                <p className="flex items-center justify-center gap-2">
                    <HardHat className="w-4 h-4 text-blue-600" />
                    <span>בטיחות המערכת היא בראש סדר העדיפויות שלנו</span>
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </body>
    </html>
)
}
