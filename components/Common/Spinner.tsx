import React from 'react';

interface SpinnerProps {
  color?: string;
  width?: number;
  height?: number;
}

const Spinner = ({ color = '#ffffff', width = 24, height = 24 }: SpinnerProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 48 48'
      width={width}
      height={height}
      className='transform-origin-center'
    >
      <g>
        <g id='_레이어_2'>
          <path
            fill={color}
            className='animate-spin origin-center'
            d='M42.1,24.2c-.1,9.9-8.2,17.8-18.1,17.8S5.9,34,5.9,24,13.9,6.1,23.8,5.9L24.5,0c-.2,0-.4,0-.5,0C10.7,0,0,10.7,0,24s10.7,24,24,24,24-10.7,24-24,0-.4,0-.5l-5.9.8Z'
          />
        </g>
      </g>
    </svg>
  );
};

export default Spinner;
