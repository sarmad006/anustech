'use client';

import styles from '@/app/components/Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBackground}>
        <Image 
          src="/bamotcool.png"
          alt="במת הרמה מתקדמת"
          width={500}
          height={300}
          className={styles.backgroundImage}
          priority
        />
      </div>
      
      <div className={styles.footerTop}>
        <div className={styles.container}>
          <div className={styles.logoAndLinks}>
            <div className={styles.logoContainer}>
              <Image 
                src="/haim-logo.png"
                alt="הלוגו שלנו"
                width={150}
                height={60}
                className={styles.logo}
              />
            </div>

            <nav className={styles.navigation}>
              <Link href="/">דף הבית</Link>
              <Link href="/profile">פרופיל חברה</Link>
              <Link href="/works">תיק עבודות</Link>
              <Link href="/faq">עזרה ראשונה</Link>
              <Link href="/services">השירותים שלנו</Link>
              <Link href="/contact">צור קשר</Link>
            </nav>

            <div className={styles.contactInfo}>
              <a href="tel:1-700-723-040" className={styles.contactItem}>
                <i className="fas fa-phone"></i> 1-700-723-040
              </a>
              <a href="mailto:info@example.com" className={styles.contactItem}>
                <i className="fas fa-envelope"></i> info@example.com
              </a>
              <span className={styles.contactItem}>
                <i className="fas fa-location-dot"></i> יוסי בנאי 26, רמלה
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.socialAndCopyright}>
            <div className={styles.socialLinks}>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <i className="fab fa-whatsapp fa-lg"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
            </div>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} במות הרמה חיים. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;