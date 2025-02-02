'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Services from '../components/Services';
import AccessibilityPanel from './components/Accessibility';
import styles from './index.module.css';
import {
  Shield,
  CheckCircle,
  Headphones,
  Phone
} from 'lucide-react';

export default function Page() {
const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      text: "השירות המקצועי והאמין של חיים מנופים עזר לנו להשלים את הפרויקט בזמן ובאיכות הגבוהה ביותר.",
      author: "יוסי כהן",
      role: "מנהל פרויקטים, חברת בנייה",
    },
    {
      text: "הצוות המקצועי והמסור תמיד זמין ומגיע בזמן. ציוד איכותי ושירות מעולה.",
      author: "דוד לוי",
      role: "מנהל אתר בנייה",
    },
    {
      text: "אמינות, מקצועיות ושירות מעל המצופה. ממליץ בחום על חיים מנופים.",
      author: "רועי שמעוני",
      role: "קבלן ראשי",
    }
  ];

useEffect(() => {
    const timer = setInterval(() => {
    setActiveTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
    );
    }, 5000);
    return () => clearInterval(timer);
}, [testimonials.length]);

  return (
    <div className={styles.mainWrapper} dir="rtl">
      <AccessibilityPanel />
      <div className={styles.contentWrapper}>
        <header className={styles.headerSection}>
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
        </header>

        <main>
          <section className={styles.introSection}>
            <div className={styles.introContainer}>
              <div className={styles.introTextContent}>
                <h1>חיים מנופים</h1>
                <h2>פתרונות הרמה אמינים ויעילים</h2>
                <div className={styles.introContent}>
                  <Image 
                    src={`/bamayafa.png`}
                    alt="במת הרמה"
                    width={250}
                    height={180}
                    className={styles.introImageFloat}
                  />
                  <p>חברת חיים מנופים מתמחה במתן פתרונות לעבודה בגובה בכל רחבי הארץ, באמצעות במות הרמה מתקדמות</p>
                  <p>החברה מתחייבת לשירות מקצועי, יחס אישי, זמני אספקה מהירים במיוחד והקפדה על שימוש בציוד חדיש ובטיחותי</p>
                  <p>ברמה הגבוהה ביותר</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <Shield className={styles.featureIcon} />
              <h3>בטיחות מקסימלית</h3>
              <p>ציוד מתקדם העומד בתקני הבטיחות</p>
            </div>
            <div className={styles.featureCard}>
              <CheckCircle className={styles.featureIcon} />
              <h3>מקצועיות</h3>
              <p>צוות מיומן ומנוסה</p>
            </div>
            <div className={styles.featureCard}>
              <Headphones className={styles.featureIcon} />
              <h3>שירות 24/7</h3>
              <p>זמינות מלאה לכל קריאה</p>
            </div>
          </section>

          <Services />
          <section className={styles.ctaSection}>
            <div className={styles.ctaContainer}>
                <div className={styles.ctaContent}>
                    <h2>מוכנים להתחיל?</h2>
                    <p>צרו איתנו קשר עוד היום לקבלת הצעת מחיר מותאמת אישית</p>
                </div>
                <form className={styles.contactForm}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="שם מלא"
                            required
                            className={styles.formInput}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            placeholder="אימייל"
                            required
                            className={styles.formInput}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="tel"
                            placeholder="טלפון"
                            required
                            className={styles.formInput}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <select className={styles.formSelect} required>
                            <option value="">בחר סוג במת הרמה</option>
                            <option value="scissor">במת מספריים</option>
                            <option value="boom">במת זרוע</option>
                            <option value="vertical">במה אנכית</option>
                            <option value="telescopic">במה טלסקופית</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        שלח בקשה
                    </button>
                </form>
            </div>
        </section>
        
          <section className={styles.productsSection}>
            <h2>המוצרים המובילים שלנו</h2>
            <div className={styles.productsGrid}>
              <div className={styles.productCard}>
                <Image 
                  src="/zroa.png" 
                  alt="במות אנכיות חשמליות" 
                  width={300} 
                  height={200} 
                  className={styles.productImage} 
                />
                <div className={styles.productContent}>
                  <h3>במות אנכיות חשמליות</h3>
                  <p>במות הרמה אנכיות חשמליות יעילות לעבודה בגובה</p>
                  <Link href="/products/scissor-lift" className={styles.productBtn}>למד עוד</Link>
                </div>
              </div>

              <div className={styles.productCard}>
                <Image 
                  src="/misparim.png" 
                  alt="במת מספריים חשמלית" 
                  width={300} 
                  height={200} 
                  className={styles.productImage} 
                />
                <div className={styles.productContent}>
                  <h3>במת מספריים חשמלית</h3>
                  <p>במות מספריים חשמליות לעבודה בגובה</p>
                  <Link href="/products/articulated-lift" className={styles.productBtn}>למד עוד</Link>
                </div>
              </div>

              <div className={styles.productCard}>
                <Image 
                  src="/mifrakit.png" 
                  alt="במות זרוע דיזל מפרקית" 
                  width={300} 
                  height={200} 
                  className={styles.productImage} 
                />
                <div className={styles.productContent}>
                  <h3>במות זרוע דיזל מפרקית</h3>
                  <p>במות זרוע דיזל מפרקיות לעבודה בגובה עם גישה מקסימלית</p>
                  <Link href="/products/telescopic-lift" className={styles.productBtn}>למד עוד</Link>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.testimonialsSection}>
            <div className={styles.testimonialCards}>
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`${styles.testimonialCard} ${index === activeTestimonial ? styles.active : ''}`}
                >
                  <p>{testimonial.text}</p>
                  <p className={styles.author}>{testimonial.author}</p>
                  <p className={styles.role}>{testimonial.role}</p>
                </div>
              ))}
            </div>
            <div className={styles.testimonialDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.testimonialDot} ${index === activeTestimonial ? styles.active : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`עבור לעדות ${index + 1}`}
                />
              ))}
            </div>
          </section>

          <section className={styles.clientLogos}>
            <h2>מבין לקוחותינו</h2>
            <div className={styles.clientLogosContainer}>
              <Image src="/ourclients/AMRON.svg" alt="AMRON" width={120} height={60} className={styles.clientLogo} />
              <Image src="/ourclients/electra.png" alt="Electra" width={120} height={60} className={styles.clientLogo} />
              <Image src="/ourclients/madcor.png" alt="Madcor" width={120} height={60} className={styles.clientLogo} />
              <Image src="/ourclients/police il.jpg" alt="Israel Police" width={120} height={60} className={styles.clientLogo} />
              <Image src="/ourclients/prigat.png" alt="Prigat" width={120} height={60} className={styles.clientLogo} />
              <Image src="/ourclients/securityoffice.png" alt="Security Office" width={120} height={60} className={styles.clientLogo} />
              <Image src="/ourclients/tasiaavirit.png" alt="Tasia Avirit" width={120} height={60} className={styles.clientLogo} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}