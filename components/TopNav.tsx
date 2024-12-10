import React from 'react';

const TopNav = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-24 flex justify-center items-center'>
      <div className='flex flex-col items-center'>
        <p className='text-lg font-bold text-white'>밴드 계급 전쟁</p>
        <p className='text-2xl font-bold text-white'>흑백밴드전</p>
      </div>
    </div>
  );
};

export default TopNav;
