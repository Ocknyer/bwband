import { basicInfo } from '@/constant';
import React from 'react';
import { Fade } from 'react-awesome-reveal';

const BasicInfoSection = () => {
  return (
    <section className='space-y-16'>
      {basicInfo.map((item) => (
        // <Fade key={item.id} direction='up' triggerOnce>
        <section key={item.id} className='flex flex-col items-center justify-center gap-y-3 text-center'>
          <p className='text-2xl font-bold text-gray-400'>{item.title}</p>
          <p className='text-lg'>{item.content}</p>
        </section>
        // </Fade>
      ))}
    </section>
  );
};

export default BasicInfoSection;
