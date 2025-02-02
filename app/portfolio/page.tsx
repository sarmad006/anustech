'use client';

import styles from '../index.module.css';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Search, Trophy, ThumbsUp, Clock, Shield, Wrench, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'במת מספריים 14 מטר',
    category: 'במות מספריים',
    description: 'פרויקט התקנת במת מספריים בגובה 14 מטר לעבודות תחזוקה במפעל תעשייתי',
    image: '/misparim.png',
    details: ['גובה עבודה: 14 מטר', 'משקל הרמה: 350 ק״ג', 'משך הפרויקט: 3 ימים'],
  },
  {
    id: 2,
    title: 'במת זרוע טלסקופית',
    category: 'במות זרוע',
    description: 'התקנת במת זרוע טלסקופית לעבודות תחזוקה ותיקונים בגובה במרכז לוגיסטי',
    image: '/zroa.png',
    details: ['גובה עבודה: 16 מטר', 'סיבוב 360 מעלות', 'משך הפרויקט: 5 ימים'],
  },
  {
    id: 3,
    title: 'במת מספריים חשמלית',
    category: 'במות מספריים',
    description: 'פרויקט במת מספריים חשמלית לעבודות פנים בקניון מסחרי',
    image: '/misparim.png',
    details: ['גובה עבודה: 10 מטר', 'הנעה חשמלית', 'משך הפרויקט: 2 ימים'],
  },
];

const categories = ['הכל', 'במות מספריים', 'במות זרוע', 'במות תורן'];

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

const ProjectCard = ({ project, onSelect }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
    onClick={() => onSelect(project)}
  >
    <div className="relative h-56">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
        style={{ filter: 'hue-rotate(190deg) brightness(1.1)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 right-4 text-white">
        <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">{project.category}</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-blue-800 mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      <div className="space-y-2">
        {project.details.map((detail, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
            <Wrench className="w-4 h-4 text-blue-500" />
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

const SearchAndFilter = ({ searchQuery, setSearchQuery, filter, setFilter }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-8">
    <div className="relative flex-grow">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="חפש פרויקטים..."
        className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        dir="rtl"
      />
    </div>
    <div className="flex gap-2 overflow-x-auto pb-2">
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
  </div>
);

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

const ProjectGrid = () => {
  const [filter, setFilter] = useState('הכל');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesFilter = filter === 'הכל' || project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className="space-y-8">
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function PortfolioPage() {
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
            הפרויקטים שלנו
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            גלריית הפרויקטים המובילים שלנו מציגה את המקצועיות, האיכות והמחויבות שלנו
            לכל לקוח ולקוח
          </p>
        </motion.section>

        <Stats />
        <ProjectGrid />
      </main>
    </div>
  );
}