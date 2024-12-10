/* eslint-disable react/no-unescaped-entities */
'use client';

import NaverMap from '@/components/NaverMap';
import useCopyClipboard from '@/hooks/useCopyClipboard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import mainImg from '@/public/image/bg_swimming.jpg';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { copyToClipboard } = useCopyClipboard();

  useEffect(() => {
    setMounted(true);
    sessionStorage.setItem('isBooked', 'false');
  }, []);

  const onClickToReservation = () => {
    router.push('reservation');
  };

  return (
    mounted && (
      <main className='w-screen h-full flex flex-col gap-10 items-center justify-center pb-24 pt-10 overflow-x-hidden'>
        <section className='w-full flex flex-col items-center relative'>
          <Fade direction='down' triggerOnce>
            <div className='mb-4'>
              <Image src={mainImg} alt='배경이미지' className='w-80 md:w-96 h-80 md:h-96 rounded-lg' />
            </div>
          </Fade>
          <div className='w-full text-center'>
            <Fade direction='left' triggerOnce>
              <p className='text-primary text-6xl font-bold'>
                2024.<span className='inline text-orange-400'>07.14</span>
              </p>
            </Fade>
            <Fade direction='right' triggerOnce>
              <p className='text-primary text-6xl font-bold'>
                SUNDAY <span className='inline text-orange-400'>17:00</span>
              </p>
            </Fade>
            <Fade direction='left' triggerOnce>
              <p className='text-primary text-6xl font-bold'>CLUB A.O.R</p>
            </Fade>
          </div>
        </section>

        <Fade direction='right' fraction={0} triggerOnce>
          <section className='flex flex-col justify-center items-center gap-y-3 relative'>
            <p className='text-2xl font-bold text-orange-400'>티켓</p>
            <p className='text-lg font-bold'>가격: 8,000₩</p>

            <p className='text-xs'>
              &#8251; 카카오뱅크{' '}
              <button
                className='underline'
                onClick={() => copyToClipboard('카카오뱅크 3333176703040', '계좌번호가 복사되었습니다.')}
              >
                3333-17-6703040
              </button>{' '}
              조민서
            </p>
            <p className='text-xs'>&#8251; 현매 가능하나, 조기 매진 시 불가능합니다.</p>
            <p className='text-xs'>&#8251; 1인 3매까지 구매하실 수 있습니다.</p>
            <p className='text-xs'>&#8251; 공연 24시간 이내 환불은 불가능합니다.</p>
            <button
              onClick={onClickToReservation}
              className='rounded-lg p-3 lg:w-56 md:w-48 w-36 bg-primary text-white font-bold'
            >
              예매하기
            </button>
          </section>
        </Fade>

        <Fade direction='up' triggerOnce>
          <section className='flex flex-col items-center justify-center gap-y-3 text-center'>
            <p className='text-2xl font-bold text-orange-400'>수용인원</p>
            <p className='text-lg'>110명 / 전석 스탠딩</p>
          </section>
        </Fade>

        <Fade direction='up' triggerOnce>
          <section className='flex flex-col items-center justify-center gap-y-3 text-center'>
            <p className='text-2xl font-bold text-orange-400'>문의</p>
            <p className='text-lg'>010-6491-2248 조민서</p>
          </section>
        </Fade>

        <Fade direction='up' triggerOnce>
          <section className='flex flex-col items-center justify-center gap-y-3 text-center'>
            <p className='text-2xl font-bold text-orange-400'>일시</p>
            <p className='text-lg'>
              2024.07.14.일요일
              <br />
              17:00 - 19:20
            </p>
          </section>
        </Fade>

        <Fade direction='up' triggerOnce>
          <section className='flex flex-col items-center justify-center gap-y-3 text-center'>
            <p className='text-2xl font-bold text-orange-400'>장소</p>
            <p className='text-lg'>클럽 A.O.R</p>
            <NaverMap />
            <p className='text-sm'>서울 마포구 와우산로 156 (서교동) 지하</p>
            <a
              className='openApp text-sm rounded-lg bg-primary text-white py-1 px-2'
              href='nmap://place?id=13530149&appname=com.example.oneway'
            >
              네이버 지도에서 열기
            </a>
          </section>
        </Fade>
      </main>
    )
  );
}
