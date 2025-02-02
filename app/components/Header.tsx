'use client'

import Image from 'next/image'
import { Phone } from 'lucide-react'
import styles from './Header.module.css'

const Header = () => (
  <div className={styles.headerSection}>
    <div className={styles.headerContainer}>
      <Image 
        src="/haim-logo.png"
        alt="Haim Logo"
        width={65}
        height={65}
        priority
        className={styles.mainLogo}
      />
      <a href="tel:1-700-723-040" className={styles.headerCallButton}>
        <Phone className={styles.phoneIcon} />
        <div className={styles.callText}>
          <span className={styles.callLabel}>הזמן במה עכשיו</span>
          <span className={styles.phoneNumber}>1-700-723-040</span>
        </div>
      </a>
    </div>
  </div>
)

export default Header