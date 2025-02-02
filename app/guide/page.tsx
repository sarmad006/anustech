'use client';

import styles from '../index.module.css';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Clock, Shield, ArrowRight, FileText, BookOpen, Users } from 'lucide-react';

interface Guide {
id: number;
title: string;
category: string;
description: string;
image: string;
details: string[];
}

interface GuideCardProps {
guide: Guide;
onSelect: (guide: Guide) => void;
}

const guides: Guide[] = [
  {
  
  
      id: 1,
      title: 'הדרכת בטיחות בסיסית',
      category: 'בטיחות כללית',
      description: 'הדרכה מקיפה בנושאי בטיחות בסיסיים לעבודה בגובה, כולל ציוד מגן אישי ונהלי חירום',
      image: '/safety-basic.png',
      details: ['משך ההדרכה: 4 שעות', 'כולל תרגול מעשי', 'תעודה בתוקף לשנה'],
  },
  {
      id: 2,
      title: 'נהלי עבודה בגובה',
      category: 'עבודה בגובה',
      description: 'הוראות מפורטות לביצוע עבודות בגובה בצורה בטוחה ומקצועית',
      image: '/height.png',
      details: ['בדיקות בטיחות', 'שימוש בציוד אבטחה', 'תקנות ותקנים'],
  },
  {
      id: 3,
      title: 'הפעלת ציוד מכני',
      category: 'ציוד והפעלה',
      description: 'מדריך מקיף להפעלה בטוחה של ציוד מכני כבד ומערכות הרמה',
      image: '/Height2.png',
      details: ['בדיקות לפני הפעלה', 'תחזוקה שוטפת', 'נהלי בטיחות'],
  },
  ];
  
  const categories = ['הכל', 'בטיחות כללית', 'עבודה בגובה', 'ציוד והפעלה', 'נהלי חירום'];
  

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

const GuideCard: React.FC<GuideCardProps> = ({ guide, onSelect }) => {
const handleClick = () => {
    onSelect(guide);
};

return (
  <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
    onClick={handleClick}
  >
      <div className="relative h-56">
        <Image
        src={guide.image}
        alt={guide.title}
     fill
        className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 right-4 text-white">
          <span className="px-2 py-1 bg-blue-600 rounded-full text-sm">{guide.category}</span>
        </div>
      </div>
      <div className="p-6">
      <h3 className="text-xl font-bold text-blue-800 mb-2">{guide.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{guide.description}</p>
        <div className="space-y-2">
        {guide.details.map((detail: string, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>{detail}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 text-blue-600 flex items-center gap-2 hover:text-blue-800 transition-colors">
          קרא עוד
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
    );
};
  
  
  const Stats = () => {
  const stats = [
      { number: '15+', text: ' שנות ניסיון', icon: <BookOpen className="w-8 h-8 text-blue-500" /> },
      { number: '500+', text: 'עובדים מוסמכים', icon: <Users className="w-8 h-8 text-blue-500" /> },
      { number: '24/7', text: 'תמיכה מקצועית', icon: <Clock className="w-8 h-8 text-blue-500" /> },
      { number: '100%', text: 'עמידה בתקנים', icon: <Shield className="w-8 h-8 text-blue-500" /> }
  ];
  
  return (
      <div className="flex justify-center my-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex flex-col items-center justify-center text-center">
              {stat.icon}
              <div className="text-3xl font-bold text-blue-600 mt-4">{stat.number}</div>
              <div className="text-gray-600 font-medium text-lg mt-2">{stat.text}</div>
              </div>
          </div>
          ))}
      </div>
      </div>
  );
  };
  
const GuideGrid = () => {
const [filter, setFilter] = useState('הכל');
const [selectedProject, setSelectedProject] = useState<Guide | null>(null);
  
  const filteredProjects = useMemo(() => {
      return guides.filter(guide => {
      return filter === 'הכל' || guide.category === filter;
      });
  }, [filter]);
  
    return (
      <div className="space-y-8">
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
      {categories.map((category) => (
          <button
          key={category}
          onClick={() => setFilter(category)}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              filter === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          >
          {category}
          </button>
      ))}
      </div>
            <AnimatePresence>
            {selectedProject && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedProject(null)}
            >
                <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                >
                <h2 className="text-2xl font-bold text-blue-800 mb-4">{selectedProject.title}</h2>
                <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                <div className="space-y-4">
                    {selectedProject.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span>{detail}</span>
                    </div>
                    ))}
                </div>
                <button
                    onClick={() => setSelectedProject(null)}
                    className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    סגור
                </button>
                </motion.div>
            </motion.div>
            )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
          {filteredProjects.map((guide) => (
          <GuideCard
              key={guide.id}
              guide={guide}
              onSelect={setSelectedProject}
          />
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  };
  
  export default function GuidePage() {
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
          עבודה בגובה – הכרחית ובטוחה
          </h1>
          <div className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed space-y-4">
          <p>
              עבודה בגובה מהווה חלק בלתי נפרד מענפים רבים בתעשייה, כמו בנייה, תשתיות, תחזוקה ועוד. עם זאת, משימות אלו טומנות בחובן סיכונים משמעותיים שיש להתייחס אליהם במלוא תשומת הלב.
          </p>
          <p>
              למרות שהעבודה בגובה לעיתים בלתי נמנעת לשם ביצוע משימות חשובות, חשוב להקפיד על נהלי בטיחות מתאימים ולהצטייד בידע ובכלים הנדרשים. הדרכה מקצועית היא מפתח לעבודה יעילה ובטוחה.
          </p>
          <p>
              באופן מפתיע, גם עובדים במגזרים כמו הייטק עשויים להידרש לעבור הדרכות עבודה בגובה, בהתאם לתקנות הבטיחות המעודכנות. הדרכות אלו הן חלק בלתי נפרד מתפקוד תקין של עסקים רבים בארץ, ולכן כדאי להבין את חשיבותן, את תהליך ההדרכה ואיפה ניתן לקבל הכשרה שתעמוד בתקנים ותשמור על בטיחות העובדים.
          </p>
          </div>
          </motion.section>
  
          <motion.section
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          >
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">מדוע הדרכת עבודה בגובה חיונית?</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
              <ol className="space-y-4">
              <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">1</span>
                  <p className="text-gray-700">הפחתת תאונות ופציעות – ההדרכה מספקת לעובדים כלים לזהות סיכונים ולנקוט באמצעי מניעה יעילים.</p>
              </li>
              <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">2</span>
                  <p className="text-gray-700">ציות לתקנות – הדרכה מוסמכת מבטיחה עמידה בדרישות החוק ומונעת סנקציות וקנסות.</p>
              </li>
              <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">3</span>
                  <p className="text-gray-700">שיפור היעילות – עובדים מיומנים מבצעים את עבודתם ביעילות גבוהה יותר, תוך שימוש מיטבי בציוד ובנהלים.</p>
              </li>
              <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">4</span>
                  <p className="text-gray-700">מוכנות למצבי חירום – ההכשרה כוללת הכנה לתרחישי חירום כמו נפילות או תקלות בציוד.</p>
              </li>
              <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">5</span>
                  <p className="text-gray-700">חיזוק מוניטין הארגון – השקעה בבטיחות מעבירה מסר של מחויבות ומקצועיות כלפי העובדים והלקוחות.</p>
              </li>
              <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">6</span>
                  <p className="text-gray-700">חיסכון בעלויות – צמצום תאונות מפחית הוצאות כספיות על טיפולים רפואיים, פיצויים ואובדן ימי עבודה.</p>
              </li>
              <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">7</span>
                  <p className="text-gray-700">טיפוח תרבות בטיחות – הדרכה מקצועית מעודדת מודעות ובניית סביבת עבודה בטוחה.</p>
              </li>
              </ol>
          </div>
          </motion.section>
  
          <Stats />
          <GuideGrid />
          
          <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 mb-12 relative overflow-hidden"
          >
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 relative overflow-hidden shadow-lg">
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">לסיכום</h2>
                  <p className="text-blue-50 text-base mb-6 leading-relaxed">
                      הדרכת עבודה בגובה היא הכרחית לעמידה בתקנות, שמירה על בטיחות העובדים ושיפור היעילות בארגון.
                      <span className="block mt-2 font-medium">
                      רוצים להעניק לעובדים שלכם את הכלים הטובים ביותר לעבודה בטוחה?
                      </span>
                  </p>
                  
                  <div className="flex items-center justify-center gap-4 mb-6">
                      <a href="tel:1-700-723-040" 
                          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-colors"
                      >
                          <span className="text-lg">📞</span>
                          <span className="text-xl font-semibold">1-700-723-040</span>
                      </a>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                      <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href="tel:1-700-723-040"
                          className="bg-white text-blue-600 px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
                      >
                          התקשר עכשיו
                      </motion.a>
                      
                      <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-blue-500/20 backdrop-blur-sm text-white border border-white/30 px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-blue-500/30 transition-all"
                      >
                          השאר פרטים
                      </motion.button>
                  </div>
              </div>
          </div>
      </motion.section>
          
      </main>
      </div>
    );
}
