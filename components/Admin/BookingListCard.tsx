'use client';

import useCopyClipboard from '@/hooks/useCopyClipboard';
import React from 'react';

interface BookingListCardProps {
  data: any;
  idx: number;
  updateCheckedState: (id: number) => void;
}

const BookingListCard = ({ data, idx, updateCheckedState }: BookingListCardProps) => {
  const { copyToClipboard } = useCopyClipboard();

  return (
    <li key={idx} className='bg-zinc-100 p-4 relative'>
      <p className='absolute right-2 top-2 text-gray-500'>{data.id}</p>
      <div className='flex gap-2 items-center mb-2'>
        <p className='text-xl font-bold text-primary'>{data.name}</p>
        <p className='text-gray-500'>{data.count}매</p>
      </div>
      <p className='text-primary/80 text-lg font-bold mb-1'>
        전화번호:{' '}
        <span className='underline' onClick={() => copyToClipboard(data.phone_number, '전화번호가 복사되었습니다.')}>
          {data.phone_number}
        </span>
      </p>
      <p className='text-primary/80'>예매 날짜: {data.createdAt}</p>
      {!data.checked ? (
        <button
          onClick={() => updateCheckedState(data.id)}
          className='absolute right-2 bottom-2 text-white bg-primary px-2 py-1'
        >
          확인
        </button>
      ) : (
        <p className='absolute right-2 bottom-2 text-gray-400 bg-gray-300 px-2 py-1'>완료</p>
      )}
    </li>
  );
};

export default BookingListCard;
