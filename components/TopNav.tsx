import Link from 'next/link';
import React from 'react';

const TopNav = () => {
  return (
    <header className='fixed top-0 left-0 w-full h-20 sm:h-24 flex justify-center items-center bg-primary z-20'>
      <Link href='/' className='flex flex-col items-center'>
        <p className='text-lg font-bold text-white'>밴드 계급 전쟁</p>
        <p className='text-2xl font-bold text-white title-font'>흑백밴드전</p>
      </Link>
    </header>
  );
};

export default TopNav;
