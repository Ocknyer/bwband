'use client';

import { noticeData } from '@/constant';
import useCopyClipboard from '@/hooks/useCopyClipboard';
import React from 'react';

const ReservationSection = () => {
  const { copyToClipboard } = useCopyClipboard();

  return (
    <section className='flex flex-col justify-center items-center gap-y-3 relative text-white p-4 bg-black/30'>
      <div className='flex flex-col gap-y-2'>
        <p className='text-xs' onClick={() => copyToClipboard('국민 94160201320107', '계좌번호가 복사되었습니다.')}>
          입금계좌 | 국민 <span className='underline decoration-solid'>941602-01-320107</span> 고유석
        </p>
        {noticeData.map((item, index) => (
          <div className='flex gap-x-2' key={index}>
            <p className='text-xs'>{index + 1}.</p>
            <p className='text-xs' key={index}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReservationSection;
