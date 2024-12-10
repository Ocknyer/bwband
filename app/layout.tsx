/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */

import './globals.css';
import NavBar from '@/components/NavBar';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={`${pretendard.variable}`}>
      <head>
        <title>PSAT 2기 정기공연</title>
        <meta property='og:description' content='PSAT 2기 홍보/예매 홈페이지' />
        <script
          defer
          type='text/javascript'
          src='https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=aejuu1jw3l'
        />
      </head>
      <body className={pretendard.className} style={{ position: 'relative' }}>
        {children}
        {/* <div className='bg-container'>
          <p className='w-full animate-flowText'>
            CHO MIN SEO, YEO JUN SEO, SHIN MIN SEO, YOO JANE, SIN SEUNG HAN, CHOI YEONG SEO
          </p>
        </div> */}
        <NavBar />
      </body>
    </html>
  );
}
