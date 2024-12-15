'use client';

import useCopyClipboard from '@/hooks/useCopyClipboard';
import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

interface ReservationInputs {
  count: number;
  // 다른 필요한 타입들 추가
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

  const totalPrice = (+inputs.count * 8000).toLocaleString();

  return (
    <section className='flex flex-col items-center justify-center gap-4 text-center min-h-dvh'>
      <Fade direction='up'>
        <div className='backdrop-blur-sm shadow-lg bg-black/70 p-6 rounded-2xl'>
          <p className='text-2xl font-bold font-capsSmall'>Booking Completed</p>
          {/* <h1 className='text-lg font-bold'>작성이 완료되었습니다.</h1> */}
          <p className='leading-7 mt-6'>
            아래 계좌번호로 <span className='inline underline font-bold'>{totalPrice}원</span>({inputs?.count}매)을
            입금해 주시면
            <br />
            예매가 완료됩니다.
            <br />
            입금 확인 후 예매 확정 문자가 발송됩니다.
            <br />
            감사합니다.
          </p>

          <p className='leading-7 mt-2'>
            입금자 성함은 <span className='inline underline font-bold'>예매자 성함</span>과
            <br />
            <span className='inline underline font-bold'>똑같이</span> 입력해주시기 바랍니다.
          </p>
          <p className='leading-7 mt-6 font-bold bg-white/100 px-4 py-1 rounded-lg text-primary'>
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
      </Fade>
    </section>
  );
};

export default CompleteSection;
