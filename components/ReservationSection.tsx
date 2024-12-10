'use client';

import { noticeData } from '@/constant';
import useCopyClipboard from '@/hooks/useCopyClipboard';
import React from 'react';

const ReservationSection = () => {
  const { copyToClipboard } = useCopyClipboard();

  return (
    <section>
      <p className='text-2xl font-bold text-gray-400'>티켓</p>
      <p className='text-lg font-bold'>가격: 10,000₩</p>
      <div className='flex flex-col gap-y-2'>
        <p className='text-xs' onClick={() => copyToClipboard('국민 94160201320107', '계좌번호가 복사되었습니다.')}>
          국민 94160201320107
        </p>
        {noticeData.map((item, index) => (
          <p className='text-xs' key={index}>
            {item}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ReservationSection;
