/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import BasicInfoSection from '@/components/BasicInfoSection';
import MapSection from '@/components/MapSection';
import IntroSection from '@/components/IntroSection';

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    sessionStorage.setItem('isBooked', 'false');
  }, []);

  return (
    mounted && (
      <main className='main-container flex flex-col gap-10 items-center justify-center pb-24 overflow-x-hidden'>
        <IntroSection />
        <BasicInfoSection />
      </main>
    )
  );
}
