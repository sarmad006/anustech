'use client';

import styles from '../index.module.css';
import Image from 'next/image';
import { Phone, Clock, Shield, Trophy, Wrench, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { ReactNode } from 'react';

interface ServiceCardProps {
title: string;
description: string;
icon: ReactNode;
}
const Stats = () => {
  const stats = [
    { number: '15+', text: 'שנות ניסיון', icon: <Trophy className="w-8 h-8 text-blue-500" /> },
    { number: '1000+', text: 'לקוחות מרוצים', icon: <ThumbsUp className="w-8 h-8 text-blue-500" /> },
    { number: '24/7', text: 'זמינות לשירות', icon: <Clock className="w-8 h-8 text-blue-500" /> },
    { number: '100%', text: 'שביעות רצון', icon: <Shield className="w-8 h-8 text-blue-500" /> }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex flex-col items-center">
            {stat.icon}
            <div className="text-4xl font-bold text-blue-600 mt-4">{stat.number}</div>
            <div className="text-gray-600 font-medium text-lg mt-2">{stat.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Header = () => (
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

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ProductShowcase = () => {
const [setActiveImage] = useState(0);
  const products = [
    {
      src: '/misparim.png',
      alt: 'במת מספריים חשמלית',
      title: 'במת מספריים חשמלית',
      description: 'פתרון אידיאלי לעבודה בגובה בחללים סגורים',
      specs: ['גובה עבודה: עד 14 מטר', 'משקל הרמה: 350 ק״ג', 'הנעה חשמלית שקטה']
    },
    {
      src: '/zroa.png',
      alt: 'במת זרוע טלסקופית',
      title: 'במת זרוע טלסקופית',
      description: 'גישה מקסימלית לכל נקודה בגובה',
      specs: ['טווח הגעה: 16 מטר', 'סיבוב 360 מעלות', 'מערכת בטיחות מתקדמת']
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-16">
      {products.map((product, index) => (
        <div key={index} 
             className="group relative bg-white rounded-2xl overflow-hidden shadow-xl"
             onMouseEnter={() => setActiveImage(index)}>
          <div className="relative h-96">
            <Image
              src={product.src}
              alt={product.alt}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-6 right-6 text-white max-w-sm">
                <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                <p className="text-gray-200 mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: 'השכרת במות הרמה',
      description: 'מגוון רחב של במות הרמה לכל סוגי העבודות, כולל אחריות מלאה ותמיכה טכנית',
      icon: <Wrench className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'ייעוץ מקצועי',
      description: 'צוות המומחים שלנו יעזור לכם לבחור את הפתרון המתאים ביותר לצרכים שלכם',
      icon: <Shield className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'שירות 24/7',
      description: 'זמינות מלאה לכל קריאה, תמיכה טכנית מקצועית ומענה מהיר בכל שעות היממה',
      icon: <Clock className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
            חיים מנופים
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            15 שנות מובילות בתחום במות ההרמה, עם מחויבות בלתי מתפשרת לאיכות, בטיחות ושירות מעולה
          </p>
        </section>

        <Stats />

        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 border-r-4 border-blue-600 pr-6 mb-8">
              המומחיות שלנו
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              חיים מנופים מובילה את תחום במות ההרמה בישראל עם פתרונות חדשניים ומתקדמים.
              הצוות המקצועי שלנו, המורכב ממהנדסים ואנשי מקצוע מנוסים, מתמחה באספקת פתרונות
              מותאמים אישית לכל פרויקט, תוך שימוש בטכנולוגיות המתקדמות ביותר בשוק.
            </p>
            <Services />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">הציוד המתקדם שלנו</h2>
          <ProductShowcase />
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8">למה לבחור בחיים מנופים?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'צוות מקצועי ומיומן עם הסמכות בינלאומיות',
              'ציוד חדיש ומתקדם העומד בתקנים המחמירים ביותר',
              'זמינות 24/7 עם מענה מהיר לכל קריאה',
              'מחירים תחרותיים ושקיפות מלאה',
              'אחריות מקיפה על כל השכרה',
              'ניסיון של 15+ שנים בתחום'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                <span className="text-blue-300 text-2xl">✓</span>
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}