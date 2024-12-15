'use client';

import useCountdown from '@/hooks/useCountdown';
import React from 'react';

interface IProps {
  endTime: string;
}

const CountdownBar = ({ endTime }: IProps) => {
  const { remainingTime, isLoading } = useCountdown(endTime);

  return (
    <div className='fixed top-20 left-0 w-full flex justify-center z-20 bg-primary items-center'>
      <div className='max-w-[720px] w-full flex items-center justify-center gap-2 font-bold bg-primary px-2 pb-2'>
        <div className='flex flex-col'>
          <div className='flex flex-col items-center justify-center'>
            {isLoading ? (
              <div className='h-8 w-48 bg-zinc-700 animate-pulse rounded'></div>
            ) : (
              <p className={`${!remainingTime.includes('D-') ? 'text-red-600' : 'text-white'} text-2xl font-capsSmall`}>
                {remainingTime}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBar;
