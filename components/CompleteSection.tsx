'use client';

import { TICKET_PRICE } from '@/constant';
import useCopyClipboard from '@/hooks/useCopyClipboard';
import React, { useEffect, useState } from 'react';

interface ReservationInputs {
  count: number;
}

const CompleteSection = () => {
  const [inputs, setInputs] = useState<ReservationInputs | null>(null);
  const { copyToClipboard } = useCopyClipboard();

  useEffect(() => {
    const json = sessionStorage.getItem('inputs');
    if (json) {
      setInputs(JSON.parse(json));
    }
  }, []);

  if (!inputs) {
    return null; // 또는 로딩 상태를 보여줄 수 있습니다
  }

  const totalPrice = (+inputs.count * TICKET_PRICE).toLocaleString();

  return (
    <section className='flex flex-col gap-4 justify-center items-center min-h-dvh pt-8'>
      <div className='backdrop-blur-sm shadow-lg bg-black/70 p-6 text-center'>
        <p className='text-2xl font-bold font-capsSmall'>Booking Completed</p>
        {/* <h1 className='text-lg font-bold'>작성이 완료되었습니다.</h1> */}
        <p className='leading-7 mt-6 text-sm'>
          아래 계좌번호로 <span className='inline underline font-bold'>{totalPrice}원</span>({inputs?.count}매)을 입금해
          주시면
          <br />
          예매가 완료됩니다.
          <br />
          입금 확인 후 예매 확정 문자가 발송됩니다.
          <br />
          감사합니다.
        </p>

        <p className='leading-7 mt-2 text-sm'>
          입금자 성함은 <span className='inline underline font-bold'>예매자 성함</span>과
          <br />
          <span className='inline underline font-bold'>똑같이</span> 입력해주시기 바랍니다.
        </p>
        <p className='leading-7 mt-6 font-bold bg-white/100 px-4 py-1 text-primary'>
          국민{' '}
          <button
            onClick={() => copyToClipboard('국민 94160201320107', '계좌번호가 복사되었습니다.')}
            className='underline decoration-solid'
          >
            941602-01-320107
          </button>
          <br />
          예금주 | 고유석
          <br />
          문의 | 010-4138-8402
        </p>
      </div>
    </section>
  );
};

export default CompleteSection;
