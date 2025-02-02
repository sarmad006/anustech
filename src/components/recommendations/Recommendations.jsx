import React from 'react';
import './recommendations.css';

const Recommendations = () => {
return (
    <div className="recommendations-container">
    <section className="testimonials-section">
        <h2>המלצות לקוחות</h2>
        <div className="testimonials-grid">
        <div className="testimonial-card">
            <blockquote>
            "שירות מעולה ומקצועי! צוות חיים מנופים תמיד זמין ואדיב. ממליץ בחום."
            </blockquote>
            <footer>
            <strong>דני כהן</strong>
            <p>מנהל פרויקטים, אלקטרה</p>
            </footer>
        </div>
        <div className="testimonial-card">
            <blockquote>
            "עבודה מקצועית ואמינה. תמיד עומדים בזמנים ונותנים שירות מצוין."
            </blockquote>
            <footer>
            <strong>יוסי לוי</strong>
            <p>מנכ"ל, תעשייה אווירית</p>
            </footer>
        </div>
        <div className="testimonial-card">
            <blockquote>
            "שירות אמין ומקצועי. ממליץ בחום על חיים מנופים לכל עבודות ההרמה."
            </blockquote>
            <footer>
            <strong>רועי ישראלי</strong>
            <p>מהנדס ראשי, פריגת</p>
            </footer>
        </div>
        </div>
    </section>
    
    <section className="clients-section">
        <h2>לקוחותינו</h2>
        <div className="clients-grid">
        <img src="/ourclients/AMRON.svg" alt="AMRON Logo" />
        <img src="/ourclients/electra.png" alt="Electra Logo" />
        <img src="/ourclients/madcor.png" alt="Madcor Logo" />
        <img src="/ourclients/police il.jpg" alt="Israel Police Logo" />
        <img src="/ourclients/prigat.png" alt="Prigat Logo" />
        <img src="/ourclients/securityoffice.png" alt="Security Office Logo" />
        <img src="/ourclients/tasiaavirit.png" alt="Tasia Avirit Logo" />
        </div>
    </section>
    </div>
);
};

export default Recommendations;

