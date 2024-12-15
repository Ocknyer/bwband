'use client';

import { TICKETS } from '@/constant';
import React from 'react';
import Spinner from './Common/Spinner';

interface ReservFormProps {
  reserveLength: number;
  name: string;
  phone_number: string;
  count: string;
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setIsAgree: React.Dispatch<React.SetStateAction<boolean>>;
  isFilled: boolean;
  isLoading: boolean;
}

const styles = {
  inputBox: 'flex flex-col w-full text-left',
  input: 'p-2 border-solid border mt-2 text-black text-base',
};

const ReservForm = ({
  reserveLength,
  name,
  phone_number,
  count,
  handleData,
  onClick,
  setIsAgree,
  isFilled,
  isLoading,
}: ReservFormProps) => {
  return (
    <form className='flex flex-col text-center items-center gap-4 mb-6 p-8 w-full backdrop-blur-sm shadow-lg bg-black/70'>
      <p className='mb-4 text-2xl text-center font-capsSmall'>{TICKETS - reserveLength!} SEATS LEFT</p>
      <div className={styles.inputBox}>
        <label htmlFor='name' className='font-bold text-sm'>
          성함
        </label>
        <input
          id='name'
          name='name'
          value={name}
          type='text'
          placeholder='ex) 김흑백'
          onChange={handleData}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.inputBox}>
        <label htmlFor='phone_number' className='font-bold text-sm'>
          전화번호
        </label>
        <input
          id='phone_number'
          name='phone_number'
          value={phone_number}
          type='text'
          placeholder='- 없이 입력해주세요.'
          onChange={handleData}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.inputBox}>
        <label htmlFor='count' className='font-bold text-sm'>
          예매 장수
        </label>
        <input
          id='count'
          name='count'
          value={count}
          max={3}
          min={1}
          type='text'
          placeholder={`ex) 1 / 최대 ${TICKETS - reserveLength! >= 3 ? 3 : TICKETS - reserveLength!}매`}
          onChange={handleData}
          required
          className={styles.input}
        />
      </div>

      <div className='flex gap-2'>
        <input id='agree' type='checkbox' className='border-none' onChange={() => setIsAgree((prev) => !prev)} />
        <label htmlFor='agree' className='text-xs'>
          개인정보제공에 동의합니다.
        </label>
      </div>
      <button
        disabled={isFilled ? false : true}
        type='submit'
        onClick={onClick}
        className={
          'h-12 p-2 w-full mt-2 flex items-center justify-center' +
          ' ' +
          [!isFilled ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white']
        }
      >
        {isLoading ? <Spinner /> : '제출하기'}
      </button>
    </form>
  );
};

export default ReservForm;
