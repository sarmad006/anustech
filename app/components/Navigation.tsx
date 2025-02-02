'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Users, Briefcase, Activity, Mail, Search, Home, HardHat } from 'lucide-react';
import Link from 'next/link';
import styles from './Navigation.module.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

return (
<div className={styles.navigationContainer} dir="rtl">
    <div
    className={styles.iconBar}
    onMouseEnter={() => setIsOpen(true)}
    >
    <Link href="/search" className={styles.iconWrapper}>
        <Search className={styles.sideIcon} />
    </Link>
    <Link href="/" className={styles.iconWrapper}>
        <Home className={styles.sideIcon} />
    </Link>
    <Link href="/about" className={styles.iconWrapper}>
        <Users className={styles.sideIcon} />
    </Link>
    <Link href="/portfolio" className={styles.iconWrapper}>
        <Briefcase className={styles.sideIcon} />
    </Link>
    <Link href="/faq" className={styles.iconWrapper}>
        <Activity className={styles.sideIcon} />
    </Link>
    <Link href="/contact" className={styles.iconWrapper}>
        <Mail className={styles.sideIcon} />
    </Link>
    <div className={styles.iconSeparator} />
    <Link href="/guide" className={styles.iconWrapper}>
        <HardHat className={`${styles.sideIcon} ${styles.guideIcon}`} />
    </Link>
    </div>
    <nav
    className={`${styles.navContainer} ${isOpen ? styles.open : ''}`}
    onMouseLeave={() => setIsOpen(false)}
    >
    <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} />
        <input
        type="search"
        placeholder="חפש..."
        className={styles.searchInput}
        aria-label="חיפוש באתר"
        />
    </div>
    <ul className={styles.navList}>
        <li className={styles.navItem}>
        <Link href="/" className={styles.navLink}>
            <Home className={styles.navIcon} />
            דף הבית
        </Link>
        </li>
        <li className={styles.navItem}>
        <Link href="/about" className={styles.navLink}>
            <Users className={styles.navIcon} />
            פרופיל חברה
        </Link>
        </li>
        <li className={styles.navItem}>
        <Link href="/portfolio" className={styles.navLink}>
            <Briefcase className={styles.navIcon} />
            תיק עבודות
        </Link>
        </li>
        <li className={styles.navItem}>
        <Link href="/faq" className={styles.navLink}>
            <Activity className={styles.navIcon} />
            עזרה ראשונה
        </Link>
        </li>
        <li className={styles.navItem}>
        <Link href="/contact" className={styles.navLink}>
            <Mail className={styles.navIcon} />
            צור קשר
        </Link>
        </li>
        <div className={styles.separatorContainer}>
        <div className={styles.separator}>
            <span className={styles.separatorLabel}>המומחיות שלנו</span>
            <span className={styles.separatorLine}></span>
        </div>
        </div>
        <div className={styles.spacer} />
        <li className={styles.navItem}>
        <Link href="/guide" className={`${styles.navLink} ${styles.guideLink}`}>
            <HardHat className={styles.navIcon} />
            הדרכה בגובה
        </Link>
        </li>
    </ul>
    </nav>
</div>
);
}

export default Navigation;