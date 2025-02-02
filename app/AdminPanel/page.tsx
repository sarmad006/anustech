'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AdminLogin() {
const router = useRouter()
const [formData, setFormData] = useState({
    email: '',
    password: ''
})
const [errors, setErrors] = useState({
    email: '',
    password: ''
})
const [isLoading, setIsLoading] = useState(false)

const validateForm = () => {
    let isValid = true
    const newErrors = {
    email: '',
    password: ''
    }

    if (!formData.email) {
    newErrors.email = 'שדה אימייל הוא חובה'
    isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'נא להזין כתובת אימייל תקינה'
    isValid = false
    }

    if (!formData.password) {
    newErrors.password = 'שדה סיסמה הוא חובה'
    isValid = false
    } else if (formData.password.length < 6) {
    newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים'
    isValid = false
    }

    setErrors(newErrors)
    return isValid
}

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
    // Here you would typically make an API call to validate credentials
    // For demo purposes, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // If login is successful, redirect to dashboard
    router.push('/dashboard')
    } catch (error) {
    console.error('Login failed:', error)
    } finally {
    setIsLoading(false)
    }
}

return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-pattern flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sm:mx-auto sm:w-full sm:max-w-md"
        >
            <div className="flex justify-center">
                <Image
                    src="/haim-logo.png"
                    alt="Logo"
                    width={120}
                    height={120}
                    className="mb-8"
                />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                כניסת מנהל
            </h2>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
            <div className="backdrop-blur-xl bg-white/10 py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-white/10 hover:border-white/20 transition-all duration-300">
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
                כתובת אימייל
            </label>
            <div className="mt-1">
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
            </div>
            </div>

            <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
                סיסמה
            </label>
            <div className="mt-1">
                <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
            </div>
            </div>

            <div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? '...מתחבר' : 'התחבר'}
            </button>
            </div>
        </form>
    </div>
</motion.div>
</div>
)
}
