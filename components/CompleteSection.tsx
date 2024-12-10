import useCopyClipboard from '@/hooks/useCopyClipboard';
import React from 'react';
import { Fade } from 'react-awesome-reveal';

const CompleteSection = () => {
  const json = typeof window !== 'undefined' ? sessionStorage.getItem('inputs') : null;
  const inputs = json && JSON.parse(json);
  const { copyToClipboard } = useCopyClipboard();

  const totalPrice = (+inputs?.count * 8000).toLocaleString();

  return (
    <section className='flex flex-col items-center justify-center gap-4 text-center mb-16 h-dvh'>
      <Fade direction='up'>
        <h1 className='text-lg'>작성이 완료되었습니다.</h1>
        <p className='leading-7 mt-2'>
          아래 계좌번호로 <span className='inline text-gray-400 font-bold'>{totalPrice}원</span>({inputs?.count}매)을
          입금해 주시면
          <br />
          예매가 완료됩니다.
          <br />
          입금 확인 후 예매 확정 문자가 발송됩니다.
          <br />
          감사합니다.
        </p>
        {/* <p className='leading-7 mt-2'>
          폼 작성 후 <span className='inline text-gray-400 font-bold'>24시간 이내</span>에 입금이 확인되지 않을 시
          <br />
          예매는 <span className='inline text-gray-400 font-bold'>자동으로 취소</span>됩니다.
        </p> */}
        <p className='leading-7 mt-2'>
          입금자 성함은 <span className='inline text-gray-400 font-bold'>예매자 성함</span>과
          <br />
          <span className='inline text-gray-400 font-bold'>똑같이</span> 입력해주시기 바랍니다.
        </p>
        <p className='leading-7 mt-2 font-bold bg-primary px-4 py-1 rounded-lg text-white'>
          카카오뱅크{' '}
          <button
            onClick={() => copyToClipboard('카카오뱅크 3333176703040', '계좌번호가 복사되었습니다.')}
            className='underline decoration-solid'
          >
            3333-17-6703040
          </button>
          <br />
          예금주 : 조민서
          <br />
          문의 : 010-6491-2248
        </p>
      </Fade>
    </section>
  );
};

export default CompleteSection;
