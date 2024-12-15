import '../globals.css';
import TopNav from '@/components/TopNav';
import { Metadata } from 'next';
import Image from 'next/image';
// import bgImage from '@/public/image/bg-image.webp';
import bgImage from '@/public/image/bg-image.png';
import localFont from 'next/font/local';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: '흑백밴드전 | 밴드 계급 전쟁',
  description: '흑백밴드전 공연 예매 홈페이지',
  openGraph: {
    title: '흑백밴드전 | 밴드 계급 전쟁',
    description: '흑백밴드전 공연 예매 홈페이지',
    images: [
      {
        url: '/opengraph/opengraph-image.png',
        alt: '빙빙 오픈그래프 이미지',
      },
    ],
    siteName: '흑백밴드전 | 밴드 계급 전쟁',
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: '/icon.png',
    apple: {
      url: '/apple-icon.png',
      sizes: '180x180',
    },
  },
};

const capsSmall = localFont({
  src: '../../public/fonts/Capsmall.ttf',
  display: 'swap',
  variable: '--font-capsmall',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <title>흑백밴드전 | 밴드 계급 전쟁</title>
        <meta property='og:description' content='흑백밴드전 공연 예매 홈페이지' />
        <link
          rel='stylesheet'
          href='https://ryj9d86xjh.execute-api.ap-northeast-2.amazonaws.com/v1/api/css/drop_fontstream_css/?sid=gAAAAABnXGgps6CdfAG-Yz8eJdrUmE5lq7AJtRnLogadz7Pm-KxyTNRzcQeHFW1V4BDBebjHKCRoBxgJSWl4Yl-HHPwQ-bfdRT_CY7_gQNiE-281EZVX3D6tcBF3U9Mud5Tl_x7jkS1PdQ1XVHcoGzDu48fnlxNxRBfzJNMLVJOxmZU3ueeR5Q2s0oSChGjwLs3iT37Jx8dBsNo2_Zk2W043JeT82uP0oF8_xDJvGJhnutzFFs4K1KGWrUA_550wg4hA4lwlyaYF'
          charSet='utf-8'
        ></link>
        <script
          defer
          type='text/javascript'
          src='https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=aejuu1jw3l'
        />
      </head>
      <body className={`relative text-white ${capsSmall.variable}`}>
        {/* <div className='fixed inset-0 w-full h-full -z-10 flex'>
          <div className='flex-1 inset-0 bg-gray-50'></div>
          <div className='flex-1 inset-0 bg-primary'></div>
        </div> */}
        <div className='fixed inset-0 w-full h-full -z-20 scale-110'>
          <div className='absolute inset-0 bg-primary z-10 opacity-40'></div>
          <Image src={bgImage} alt='배경이미지' fill className='object-cover' />
        </div>
        <TopNav />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
