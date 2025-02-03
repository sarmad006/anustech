'use client'

import { useState } from 'react'
import Image from 'next/image'
import Equipment from '@/app/components/dashboard/Equipment.jsx'
import ActiveProjects from '@/app/components/dashboard/ActiveProjects'
import Accounting from '@/app/components/dashboard/Accounting';
import Reports from '@/app/components/dashboard/Reports';

import dynamic from 'next/dynamic'

const PlatformMap = dynamic(() => import('@/app/components/dashboard/PlatformMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-lg bg-gray-900/50 flex items-center justify-center">
      <span className="text-gray-400">טוען מפה...</span>
    </div>
  )
})

// Define interfaces for our data structures
interface ActivityItem {
  type: string
  text: string
  time: string
}

interface ScheduleItem {
  title: string
  count: string
  date: string
}

interface MetricItem {
  icon: React.ReactNode
  label: string
  value: string | number
}

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState('overview')

  // Define activity items
  const activityItems: ActivityItem[] = [
    { type: 'rental', text: 'במה #45 הושכרה ל-3 שבועות', time: 'לפני שעה' },
    { type: 'return', text: 'במה #32 הוחזרה מהשכרה', time: 'לפני 3 שעות' },
    { type: 'maintenance', text: 'הושלמה תחזוקה לבמה #28', time: 'לפני 5 שעות' },
    { type: 'payment', text: 'התקבל תשלום: ₪12,450', time: 'אתמול' }
  ]

  // Define schedule items
  const scheduleItems: ScheduleItem[] = [
    { title: 'תחזוקה מתוכננת', count: '5', date: 'השבוע הבא' },
    { title: 'החזרות צפויות', count: '8', date: 'השבוע' },
    { title: 'משלוחים מתוכננים', count: '3', date: 'היום' },
    { title: 'חידושי חוזים', count: '2', date: 'החודש' }
  ]

  // Define metrics
  const metrics: MetricItem[] = [
    {
      icon: (
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2zm5 9v-3a2 2 0 012-2h4a2 2 0 012 2v3" />
        </svg>
      ),
      label: '  סקירת במות כללית',
      value: '92'
    },
    {
      icon: (
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      label: 'אחוז פעילות',
      value: '%'
    },
    {
      icon: (
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      label: 'פרויקטים פעילים',
      value: '24'
    },
    {
      icon: (
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: 'ממתין לתשלום',
      value: '₪15,832'
    },
    {
      icon: (
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'במות בתחזוקה',
      value: '7'
    },
    {
      icon: (
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'במות פנויות',
      value: '12'
    }
  ]

  const renderContent = () => {
    switch(currentSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Metrics Section */}
            <div>
              <h2 className="text-lg font-medium text-white">ברוך הבא, מנהל!</h2>
              <p className="mt-1 text-sm text-gray-300">הנה נתונים מעודכנים לתאריך של היום</p>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6 mt-4 max-w-7xl">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-lg overflow-hidden shadow rounded-lg border border-gray-700">
                    <div className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {metric.icon}
                        </div>
                        <div className="mr-4 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-300 truncate">{metric.label}</dt>
                            <dd className="text-base font-medium text-white">{metric.value}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Alerts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions Panel */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-medium text-white mb-4">פעולות מהירות</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    הזמנה חדשה
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-3 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    תחזוקה חדשה
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-3 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    צור חשבונית
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-3 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    הוסף במה
                  </button>
                </div>
              </div>

              {/* Recent Activity Timeline */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-medium text-white mb-4">פעילות אחרונה</h3>
                <div className="space-y-4">
                  {activityItems.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{activity.text}</p>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts Section */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-medium text-white mb-4">התראות</h3>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m04h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-red-400">תחזוקה נדרשת</p>
                        <p className="text-xs text-gray-300">3 במות דורשות טיפול דחוף</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-yellow-400">חוזים מסתיימים</p>
                        <p className="text-xs text-gray-300">5 חוזים מסתיימים בשבוע הקרוב</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-blue-400">תשלומים בהמתנה</p>
                        <p className="text-xs text-gray-300">8 חשבוניות ממתינות לתשלום</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
{/* Map and Performance Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Map Section */}
  <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6">
    <h3 className="text-lg font-medium text-white mb-4">מפת במות פעילות</h3>
    <PlatformMap />
    <div className="mt-4 flex gap-4">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm text-gray-300">פעיל</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <span className="text-sm text-gray-300">בתחזוקה</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <span className="text-sm text-gray-300">לא זמין</span>
      </div>
    </div>
  </div>
              {/* Performance Charts */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-medium text-white mb-4">ביצועים</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">שיעור ניצול במות</span>
                      <span className="text-sm font-medium text-white">78%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">שביעות רצון לקוחות</span>
                      <span className="text-sm font-medium text-white">92%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Schedule */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium text-white mb-4">לוח זמנים קרוב</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {scheduleItems.map((item, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-sm font-medium text-gray-300">{item.title}</h4>
                    <div className="mt-2 flex justify-between items-end">
                      <span className="text-2xl font-bold text-white">{item.count}</span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'projects':
        return <ActiveProjects/>
      case 'equipment':
        return <Equipment />
        case 'employees':
          return <Accounting />
      case 'maintenance':
        return <div className="text-white">תוכן תחזוקה</div>
      case 'reports':
        return <Reports />
      default:
        return <div className="text-white">בחר קטגוריה</div>
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-6">
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50">
        <div className="h-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-xl">
          <div className="mx-auto h-full">
            <div className="flex h-full justify-between items-center px-4">
              <div className="flex items-center gap-3 order-1">
                <h1 className="text-2xl font-semibold text-white">שליטה ובקרה - חיים מנופים</h1>
              </div>
              <div className="flex items-center gap-4 order-2">
                <button
                  className="md:hidden text-white"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <Image 
                  src="/haim-logo.png" 
                  alt="Haim Logo" 
                  width={40} 
                  height={40}
                  priority 
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar - Fixed on the right */}
        <aside className={`
          fixed top-16 right-2 
          bg-gray-800/50 backdrop-blur-lg 
          w-72 
          h-[calc(100vh-4rem)]
          overflow-y-auto
          shadow-lg
          transition-transform
          z-40
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-4 space-y-1">
            <button 
              onClick={() => setCurrentSection('overview')}
              className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-gray-700/50 
                ${currentSection === 'overview' ? 'bg-gray-700/50' : ''}`}
            >
              <svg className="ml-3 h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              סקירה כללית
            </button>

            <button
              onClick={() => setCurrentSection('projects')}
              className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-gray-700/50
                ${currentSection === 'projects' ? 'bg-gray-700/50' : ''}`}
            >
              <svg className="ml-3 h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              פרויקטים פעילים
            </button>

            <button
              onClick={() => setCurrentSection('equipment')}
              className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-gray-700/50
                ${currentSection === 'equipment' ? 'bg-gray-700/50' : ''}`}
            >
              <svg className="ml-3 h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              ניהול במות
            </button>

            <button
              onClick={() => setCurrentSection('employees')}
              className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-gray-700/50
                ${currentSection === 'employees' ? 'bg-gray-700/50' : ''}`}
            >
              <svg className="ml-3 h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              הנהלת חשבונות
            </button>

            <button
              onClick={() => setCurrentSection('maintenance')}
              className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-gray-700/50
                ${currentSection === 'maintenance' ? 'bg-gray-700/50' : ''}`}
            >
              <svg className="ml-3 h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 000-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              תחזוקה
            </button>

            <button
              onClick={() => setCurrentSection('reports')}
              className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-gray-700/50
                ${currentSection === 'reports' ? 'bg-gray-700/50' : ''}`}
            >
              <svg className="ml-3 h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              דוחות
            </button>
          </nav>
        </aside>

        {/* Main Content - Pushed from right by sidebar */}
        <main className="flex-1 mt-16 mr-0 md:mr-72 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}