'use client';

import styles from '../index.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Shield, Wrench, AlertTriangle, Clock, CheckCircle, Heart, Settings, Battery, Sun, Hammer } from 'lucide-react';
import { ReactElement } from 'react';

interface Guide {
id: number;
title: string;
description: string;
icon: ReactElement;
category: string;
}

interface GuideCardProps {
guide: Guide;
index: number;
}

const maintenanceGuides: Guide[] = [
  {
    id: 1,
    title: 'בדיקת יציבות הקרקע',
    description: 'וודאו שהקרקע יציבה ואינה חלקה או בוצית. יציבות הקרקע מבטיחה עבודה בטוחה ויעילה.',
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    category: 'בטיחות'
  },
  {
    id: 2,
    title: 'בדיקת תקינות הציוד',
    description: 'עברו על במת ההרמה לפני השימוש. בדקו שאין ברגים רופפים, נזילות שמן, או סימנים לפגיעות מכניות.',
    icon: <Hammer className="w-8 h-8 text-blue-500" />,
    category: 'תחזוקה'
  },
  {
    id: 3,
    title: 'שימוש נכון בבקרי שליטה',
    description: 'אם הבקרה לא מגיבה, כבו את המערכת, בדקו את החיבורים ונסו להפעיל מחדש. תמיד קראו את המדריך למשתמש!',
    icon: <Settings className="w-8 h-8 text-blue-500" />,
    category: 'הפעלה'
  },
  {
    id: 4,
    title: 'מה עושים במקרה של תקלה במנוע?',
    description: 'תקלה במנוע יכולה להיגרם משמן מנוע נמוך. בדקו את רמת השמן והוסיפו במידת הצורך. אם התקלה נמשכת, צרו קשר עם השירות הטכני.',
    icon: <Wrench className="w-8 h-8 text-blue-500" />,
    category: 'תקלות'
  },
  {
    id: 5,
    title: 'שמרו על בטיחות העובדים',
    description: 'ודאו שכל העובדים משתמשים בציוד מגן אישי: קסדות, רתמות בטיחות ונעליים מתאימות.',
    icon: <Heart className="w-8 h-8 text-blue-500" />,
    category: 'בטיחות'
  },
  {
    id: 6,
    title: 'נתקלים בקושי בהרמה?',
    description: 'יתכן שמשקל ההרמה חורג מהמותר. בדקו את העומס ותאמו מחדש את המשקלים לפי הנחיות הבמה.',
    icon: <AlertTriangle className="w-8 h-8 text-blue-500" />,
    category: 'תקלות'
  },
  {
    id: 7,
    title: 'מה עושים במקרה של מערכת חירום?',
    description: 'אם מערכת החירום הופעלה, ודאו שלא מדובר בהפעלת שווא. בצעו איפוס ידני והתחילו מחדש.',
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    category: 'חירום'
  },
  {
    id: 8,
    title: 'ניקוי וחיטוי הציוד',
    description: 'אבק ולכלוך יכולים להשפיע על תפקוד הציוד. הקפידו לנקות את הבמה לאחר כל שימוש.',
    icon: <Sun className="w-8 h-8 text-blue-500" />,
    category: 'תחזוקה'
  },
  {
    id: 9,
    title: 'חשמל או דיזל?',
    description: 'בדקו האם מדובר בתקלה במקור הכוח (חשמל/דיזל). לעיתים חיבור לא נכון או דלק חסר הם הבעיה.',
    icon: <Battery className="w-8 h-8 text-blue-500" />,
    category: 'תקלות'
  },
  {
    id: 10,
    title: 'מה עושים במקרה של נורית אזהרה?',
    description: 'אם נדלקת נורית אזהרה, עיינו במדריך ההפעלה. לרוב מדובר באזהרה לתחזוקה, שמן או עומס יתר.',
    icon: <AlertTriangle className="w-8 h-8 text-blue-500" />,
    category: 'אזהרות'
  },
  {
    id: 11,
    title: 'תחזוקה תקופתית חוסכת תקלות',
    description: 'וודאו שאתם מבצעים בדיקות ותחזוקה תקופתיות לפי הוראות היצרן. תחזוקה קבועה מאריכה את חיי הציוד.',
    icon: <Clock className="w-8 h-8 text-blue-500" />,
    category: 'תחזוקה'
  },
  {
    id: 12,
    title: 'שירות לקוחות 24/7',
    description: 'בכל מקרה של תקלה שאינכם מצליחים לפתור, צרו קשר עם צוות התמיכה שלנו. אנחנו כאן כדי לעזור בכל שעה.',
    icon: <Phone className="w-8 h-8 text-blue-500" />,
    category: 'שירות'
  },
];

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

const GuideCard: React.FC<GuideCardProps> = ({ guide, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        {guide.icon}
      </div>
      <div>
        <div className="mb-1">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {guide.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-blue-800 mb-2">{guide.title}</h3>
        <p className="text-gray-600 leading-relaxed">{guide.description}</p>
      </div>
    </div>
  </motion.div>
);

const EmergencyContact: React.FC = () => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 shadow-lg">
    <div className="flex items-center gap-4 mb-4">
      <AlertTriangle className="w-8 h-8" />
      <h2 className="text-2xl font-bold">צריכים עזרה?</h2>
    </div>
    <p className="text-lg mb-6">
      צוות התמיכה המקצועי שלנו זמין 24/7 לכל שאלה, תקלה או בעיה
    </p>
    <a 
      href="tel:1-700-723-040"
      className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
    >
      <Phone className="w-5 h-5" />
      <span>1-700-723-040</span>
    </a>
  </div>
);

const BusinessHours: React.FC = () => (
  <div className="bg-white rounded-xl p-8 shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <Clock className="w-6 h-6 text-blue-600" />
      זמני פעילות
    </h2>
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span>ימים א׳-ה׳: 08:00-18:00</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span>יום ו׳: 08:00-13:00</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span>שירות חירום: 24/7</span>
      </div>
    </div>
  </div>
);

const MaintenanceGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
            מדריך תחזוקה ותפעול
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            המדריך המקיף שלנו לתחזוקה ותפעול נכון של במות הרמה, עם פתרונות לבעיות נפוצות
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {maintenanceGuides.map((guide, index) => (
            <GuideCard key={guide.id} guide={guide} index={index} />
          ))}
        </div>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <EmergencyContact />
          <BusinessHours />
        </section>
      </main>
    </div>
  );
};

export default MaintenanceGuidePage;