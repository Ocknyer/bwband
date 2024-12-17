'use client';

import CompleteSection from '@/components/CompleteSection';
import { Fade } from 'react-awesome-reveal';

const CompletePage = () => {
  return (
    <main className='main-container px-6'>
      <Fade direction='up' triggerOnce>
        <CompleteSection />
      </Fade>
    </main>
  );
};

export default CompletePage;
