import React from 'react';

interface SpinnerProps {
  color?: string;
  width?: number;
  height?: number;
}

const DoubleArrowDown = ({ color = '#ffffff', width = 24, height = 24 }: SpinnerProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={height}
      viewBox='0 -960 960 960'
      width={width}
      fill={color}
      className='animate-bounce'
    >
      <path d='M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z' />
    </svg>
  );
};

export default DoubleArrowDown;
