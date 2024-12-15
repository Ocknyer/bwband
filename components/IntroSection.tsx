import React from 'react';
import { Fade } from 'react-awesome-reveal';
import DoubleArrowDown from './Common/DoubleArrowDown';

const IntroSection = () => {
  return (
    <section className='flex flex-col min-h-dvh justify-between pt-40 sm:pt-48 pb-20 sm:pb-36'>
      <Fade direction='up' triggerOnce duration={1000}>
        <div className='flex flex-col gap-4 items-center text-center intro-font'>
          <p className='text-base font-bold text-white leading-8'>흑과 백, 글과 종이이자 음표와 악보.</p>
          <p className='text-sm text-white leading-6'>
            모든 걸 구성하는 가장 기본적인 두 색이 만나 <br className='block sm:hidden' /> 깊은 울림을 만들어냅니다.
          </p>
          <p className='text-sm text-white leading-6'>
            대비되는 두 색이 조화를 만드는 그 현장으로 <br className='block sm:hidden' /> 여러분을 초대합니다.
          </p>
        </div>
        <div className='flex flex-col gap-2 items-center text-center'>
          <p className='font-capsSmall text-4xl sm:text-5xl'>The Rotten</p>
          <p className='font-capsSmall text-4xl sm:text-5xl'>Band JANSs</p>
          <Fade triggerOnce delay={1000} className='mt-4'>
            <DoubleArrowDown />
          </Fade>
        </div>
      </Fade>
    </section>
  );
};

export default IntroSection;
