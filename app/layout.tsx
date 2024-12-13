/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */

import './globals.css';
import NavBar from '@/components/NavBar';
import TopNav from '@/components/TopNav';
import { Metadata } from 'next';
import localFont from 'next/font/local';

const metadata: Metadata = {
  title: '흑백밴드전 | 밴드 계급 전쟁',
  description: '흑백밴드전 공연 예매 홈페이지',
};

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
        <title>흑백밴드전 | 밴드 계급 전쟁</title>
        <meta property='og:description' content='흑백밴드전 공연 예매 홈페이지' />
        <link
          rel='stylesheet'
          href='https://ryj9d86xjh.execute-api.ap-northeast-2.amazonaws.com/v1/api/css/drop_fontstream_css/?sid=gAAAAABnXGgps6CdfAG-Yz8eJdrUmE5lq7AJtRnLogadz7Pm-KxyTNRzcQeHFW1V4BDBebjHKCRoBxgJSWl4Yl-HHPwQ-bfdRT_CY7_gQNiE-281EZVX3D6tcBF3U9Mud5Tl_x7jkS1PdQ1XVHcoGzDu48fnlxNxRBfzJNMLVJOxmZU3ueeR5Q2s0oSChGjwLs3iT37Jx8dBsNo2_Zk2W043JeT82uP0oF8_xDJvGJhnutzFFs4K1KGWrUA_550wg4hA4lwlyaYF'
          crossOrigin='anonymous'
        />
        <script
          defer
          type='text/javascript'
          src='https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=aejuu1jw3l'
        />
      </head>
      <body className={`${pretendard.variable} relative bg-primary text-white pt-24`}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
