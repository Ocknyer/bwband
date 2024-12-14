import React from 'react';
import { Fade } from 'react-awesome-reveal';
import NaverMap from './NaverMap';

const MapSection = () => {
  return (
    <Fade direction='up' triggerOnce className='w-full'>
      <section className='flex flex-col items-center justify-center text-center w-full gap-4 mt-6'>
        <NaverMap />
        {/* <p className='text-sm'>(서울 마포구 동교로 162-5 지하 1층)</p> */}
        <a
          className='openApp text-sm border border-white text-white bg-primary/50 py-2 px-4'
          href='nmap://place?id=1175505220&appname=com.example.bwband'
        >
          네이버 지도에서 열기
        </a>
      </section>
    </Fade>
  );
};

export default MapSection;
