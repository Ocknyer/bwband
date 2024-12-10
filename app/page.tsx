/* eslint-disable react/no-unescaped-entities */
'use client';

import NaverMap from '@/components/NaverMap';
import useCopyClipboard from '@/hooks/useCopyClipboard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import mainImg from '@/public/image/bg_swimming.jpg';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';
import MapSection from '@/components/MapSection';
import BasicInfoSection from '@/components/BasicInfoSection';
import ReservationSection from '@/components/ReservationSection';
import CountdownBar from '@/components/CountdownBar';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { copyToClipboard } = useCopyClipboard();

  useEffect(() => {
    setMounted(true);
    sessionStorage.setItem('isBooked', 'false');
  }, []);

  return (
    mounted && (
      <main className='w-screen h-full flex flex-col gap-10 items-center justify-center pb-24 pt-10 overflow-x-hidden'>
        <section className='flex flex-col justify-center items-center gap-y-3 relative'>
          <ReservationSection />
        </section>

        <BasicInfoSection />

        <MapSection />

        <CountdownBar endTime={'2025-01-04'} />
      </main>
    )
  );
}
