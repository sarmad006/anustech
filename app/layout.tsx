import { Inter } from 'next/font/google'
import { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
metadataBase: new URL('https://example.com'),
title: {
template: '%s | חיים מנופים',
default: 'חיים מנופים - במות הרמה',
},
description: 'השכרת במות הרמה במחירים נוחים ואטרקטיבים במקצועיות ובטיחות',
keywords: ['במות הרמה', 'השכרת במות', 'חיים מנופים'],
robots: {
index: true,
follow: true,
},
viewport: {
width: 'device-width',
initialScale: 1,
maximumScale: 5,
},
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
    <html lang="he" dir="rtl">
    <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
    </head>
    <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
    </body>
    </html>
);
}
