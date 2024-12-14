'use client';

import useCountdown from '@/hooks/useCountdown';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CompleteSection from './CompleteSection';

interface IProps {
  endTime: string;
}

const CountdownBar = ({ endTime }: IProps) => {
  const router = useRouter();
  const { remainingTime } = useCountdown(endTime);
  const [isComplete, setIsComplete] = useState(false);

  const handleReservation = () => {
    router.push('/reservation');
  };

  if (isComplete) {
    return <CompleteSection />;
  }

  return (
    <div className='fixed bottom-0 left-0 w-full flex justify-center z-20 bg-primary'>
      <div className='max-w-[720px] w-full flex items-center justify-center gap-2 font-bold bg-primary p-3'>
        <div className='flex flex-col'>
          <div className='flex flex-col items-center justify-center'>
            <p className={`${!remainingTime.includes('D-') ? 'text-red-600' : 'text-white'} text-xl title-font`}>
              {remainingTime}
            </p>
          </div>
        </div>
        <button
          onClick={handleReservation}
          id='reservation-form'
          className='bg-white text-primary py-2 px-4 ml-auto h-full hover:bg-gray-100 transition-colors title-font'
        >
          예매하기
        </button>
      </div>
    </div>
  );
};

export default CountdownBar;
