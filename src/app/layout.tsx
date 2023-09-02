import './globals.css';
import { Manrope } from 'next/font/google';
import type { Metadata } from 'next';

const manrope = Manrope({
  weight: ['400'],
  fallback: ['sans-serif'],
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Гистограмма',
  description: 'Простая гистограмма',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body style={manrope.style}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
