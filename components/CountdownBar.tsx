'use client';

import useCountdown from '@/hooks/useCountdown';
import React from 'react';

interface IProps {
  endTime: string;
}

const CountdownBar = ({ endTime }: IProps) => {
  const { remainingTime } = useCountdown(endTime);

  return (
    <div className='fixed bottom-0 left-0 w-full flex justify-center z-20'>
      <div className='max-w-[720px] w-full flex items-center justify-center gap-2 font-GmarketSans font-bold bg-zinc-900 px-4 py-2 shadow-sm'>
        <div className='flex flex-col'>
          {remainingTime ? (
            <>
              <p className={`${!remainingTime.includes('일') ? 'text-red-600' : 'text-white'} text-xl`}>
                {remainingTime}
              </p>
              <p className='text-white text-xs'>망설이면 늦어요!</p>
            </>
          ) : (
            <>
              <div className='w-40 h-6 bg-gray-100 animate-pulse rounded-md mb-1'></div>
              <p className='text-white text-xs'>망설이면 늦어요!</p>
            </>
          )}
        </div>
        <button
          id='reservation-form'
          className='bg-red-500 text-white px-4 rounded-lg ml-auto h-full hover:bg-red-400 transition-colors'
        >
          지금 신청하기
        </button>
      </div>
    </div>
  );
};

export default CountdownBar;
