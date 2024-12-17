import Link from 'next/link';
import React from 'react';
import CountdownBar from './CountdownBar';

const TopNav = () => {
  return (
    <header className='fixed top-0 left-0 w-full h-20 flex justify-center bg-primary z-20 p-2'>
      <Link href='/' className='flex flex-col items-center'>
        <p className='text-lg text-white font-gongGothicMedium'>밴드 계급 전쟁</p>
        <p className='text-3xl font-bold text-white title-font mt-1'>흑백밴드전</p>
      </Link>
      <CountdownBar endTime='2025-01-04T18:00:00' />
    </header>
  );
};

export default TopNav;
