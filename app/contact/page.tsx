'use client';

import styles from '../index.module.css';
import Image from 'next/image';
import { Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';



const Header: React.FC = () => (
  <div className={styles.headerSection}>
    <div className={styles.headerContainer}>
      <Image 
        src="/haim-logo.png"
        alt="Haim Logo"
        width={200}
        height={80}
        priority
        className={styles.mainLogo}
      />
      <a href="tel:1-700-723-040" className={styles.headerCallButton}>
        <Phone className={styles.phoneIcon} />
        <span className={styles.callText}>
          <span className={styles.callLabel}>הזמן במה עכשיו</span>
          <span className={styles.phoneNumber}>1-700-723-040</span>
        </span>
      </a>
    </div>
  </div>
);







const ContactPage: React.FC = () => {
interface FormData {
name: string;
email: string;
phone: string;
message: string;
}

const [loading, setLoading] = useState<boolean>(false);
const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
});

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('ההודעה נשלחה בהצלחה! נחזור אליך בהקדם');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setLoading(false);
};

return (
    <div className="bg-gray-50 min-h-screen">
    <Toaster position="top-center" />
    <Header />
    <main className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
        <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
        >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
            צור קשר
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            אנחנו כאן לשירותך. צור איתנו קשר ונחזור אליך בהקדם
        </p>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">פרטי התקשרות</h2>
            <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                <p className="font-medium text-gray-600">טלפון</p>
                <a href="tel:1-700-723-040" className="text-lg text-blue-600 hover:text-blue-700">
                    1-700-723-040
                </a>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                <p className="font-medium text-gray-600">אימייל</p>
                <a href="mailto:info@haim-cranes.co.il" className="text-lg text-blue-600 hover:text-blue-700">
                    Office@haim-manofim.co.il
                </a>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                <p className="font-medium text-gray-600">כתובת</p>
                <p className="text-lg">רחוב יוסי בנאי 26, רמלה</p>
                </div>
            </div>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-2">שעות פעילות</h3>
            <div className="space-y-2 text-gray-600">
                <p>ראשון - חמישי: 08:00 - 19:00</p>
                <p>שישי: 08:00 - 13:00</p>
                <p>שבת: סגור</p>
            </div>
            </div>
        </motion.section>

        <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
        >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">שלח הודעה</h2>
            <div className="space-y-6">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    שם מלא
                </label>
                <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    אימייל
                </label>
                <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>

                <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    טלפון
                </label>
                <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>

                <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    הודעה
                </label>
                <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
                >
                {loading ? (
                    <>
                    <Loader2 className="w-5 h-5 animate-spin ml-2" />
                    שולח...
                    </>
                ) : (
                    'שלח הודעה'
                )}
                </button>
            </div>
            </form>
        </motion.section>
        </div>
    </main>
    </div>
);
}

export default ContactPage;
