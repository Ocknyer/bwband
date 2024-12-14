/* eslint-disable react/no-unescaped-entities */
'use client';

import useCopyClipboard from '@/hooks/useCopyClipboard';

import { useEffect, useState } from 'react';
import mainImg from '@/public/image/guitar.png';
import Image from 'next/image';

import BasicInfoSection from '@/components/BasicInfoSection';
import ReservationSection from '@/components/ReservationSection';
import CountdownBar from '@/components/CountdownBar';
import ReservSection from '@/components/ReservSection';
import MapSection from '@/components/MapSection';

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { copyToClipboard } = useCopyClipboard();

  useEffect(() => {
    setMounted(true);
    sessionStorage.setItem('isBooked', 'false');
  }, []);

  return (
    mounted && (
      <main className='main-container flex flex-col gap-10 items-center justify-center px-6 pb-24 pt-32 overflow-x-hidden'>
        <div className='flex justify-center w-[450px] sm:w-[640px] h-[450px] sm:h-[640px] relative'>
          <Image src={mainImg} alt='기타이미지' fill priority className='object-contain' />
        </div>
        <BasicInfoSection />
        {/* <ReservSection /> */}

        <MapSection />
        <CountdownBar endTime={'2025-01-04'} />
      </main>
    )
  );
}
