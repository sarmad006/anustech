import './globals.css';

export const metadata = {
  title: 'חיים מנופים - מערכת ניהול',
  description: 'מערכת ניהול לחיים מנופים',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
} 