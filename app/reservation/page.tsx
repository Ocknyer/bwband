/* eslint-disable react/no-unescaped-entities */
'use client';

import CompleteSection from '@/components/CompleteSection';
import fireStore from '../../firebase/firestore';
import { getDocs, addDoc, collection, query, orderBy, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import emailjs from '@emailjs/browser';
import { TICKETS } from '@/constant';
import ReservationSection from '@/components/ReservationSection';
import { useRouter } from 'next/navigation';

export type Input = {
  name: string;
  count: string;
  phone_number: string;
};

const styles = {
  inputBox: 'flex flex-col w-full text-left',
  input: 'p-2 border-solid border mt-2 text-black text-base',
};

const Reservation = () => {
  const formRef = useRef<any>();
  const router = useRouter();

  const [time, setTime] = useState(new Date());
  const [dataList, setDataList] = useState<any>([]);
  const [reserveLength, setReserveLength] = useState<number>();

  const json = typeof window !== 'undefined' ? sessionStorage.getItem('isBooked') : null;
  const isBooked = json && JSON.parse(json);

  const [id, setId] = useState<string>();
  const [isAgree, setIsAgree] = useState(false);
  const [inputs, setInputs] = useState<Input>({
    name: '',
    count: '',
    phone_number: '',
  });

  const isFilled = inputs.name !== '' && inputs.count !== '' && inputs.phone_number.length >= 13 && isAgree;

  // 데이터 핸들링
  const { name, count, phone_number } = inputs;

  const handleData = (e: any) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setInputs({ ...inputs, [name]: value });
    }

    if (name === 'phone_number') {
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(e.target.value)) {
        setInputs({ ...inputs, phone_number: e.target.value });
      }
    }

    if (name === 'count') {
      const regex =
        TICKETS - reserveLength! >= 3 ? /^[1-3]{0,1}$/ : TICKETS - reserveLength! === 2 ? /^[1-2]{0,1}$/ : /^[1]{0,1}$/;
      if (regex.test(e.target.value)) {
        setInputs({ ...inputs, count: e.target.value });
      }
    }
  };

  // 유효성 검사
  useEffect(() => {
    if (inputs.phone_number.length === 10) {
      setInputs({
        ...inputs,
        phone_number: inputs.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      });
    } else if (inputs.phone_number.length === 11) {
      setInputs({
        ...inputs,
        phone_number: inputs.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      });
    } else if (inputs.phone_number.length === 13) {
      setInputs({
        ...inputs,
        phone_number: inputs.phone_number.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.phone_number]);

  // 예약자 명단 가져오기
  const getReserveList = async () => {
    const q = query(collection(fireStore, 'bwbandbooker'), orderBy('createdAt'));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: Number(doc.id) };
    });

    setDataList(data);
    setReserveLength(data.reduce((acc: number, cur: any) => (acc += +cur?.count), 0));

    if (data[data.length - 1]?.id) {
      return data[data.length - 1].id;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    getReserveList().then((id) => {
      const newId = id + 1;
      setId(String(newId));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 10000);

    return () => {
      clearInterval(interval);
    };
  });

  // 예매내역 확인
  const checkIsBooked = (inputs: Input) => {
    // const checkName = dataList.filter((item: any) => item.name === inputs.name);
    const checkPhoneNumber = dataList.filter((item: any) => item.phone_number === inputs.phone_number);

    return checkPhoneNumber.length > 0 ? true : false;
  };

  const sendEmail = () => {
    try {
      emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID as string,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
      );
    } catch (error) {
      console.log(error);
    }
  };

  // form 제출
  const onClickReserve = async (e: any) => {
    e.preventDefault();

    if (checkIsBooked(inputs)) {
      alert(
        '입력하신 휴대전화번호로 기존 예매 정보가 존재합니다.\n\n추가 예매를 원하시면 010-4138-8402(고유석)으로 문의 주시기 바랍니다.'
      );
      setInputs({ ...inputs, phone_number: '' });
      return;
    }

    if (inputs.count && inputs.name && inputs.phone_number) {
      await setDoc(doc(fireStore, 'bwbandbooker', id as string), { ...inputs, createdAt: time, checked: false })
        .then(() => {
          sendEmail();
          sessionStorage.setItem('isBooked', 'true');
        })
        .then(() => {
          router.push('/complete');
          sessionStorage.setItem('inputs', JSON.stringify(inputs));
          setInputs({
            name: '',
            count: '',
            phone_number: '',
          });
        });
    } else {
      alert('필수 정보를 입력해 주세요');
    }
  };

  return (
    <main className='flex flex-col items-center justify-center w-full max-w-96 min-h-dvh pt-32 px-6 pb-16'>
      {!dataList ? (
        <svg className='animate-spin h-10 w-10 mr-3' fill='#00b7ff' viewBox='0 0 48 48'>
          <g id='_레이어_1-2' data-name='레이어 1'>
            <path
              className='cls-1'
              d='m42.7,20.72c.19,1.07.3,2.16.3,3.28,0,10.48-8.52,19-19,19S5,34.48,5,24,13.52,5,24,5c1.12,0,2.21.12,3.28.3l1.9-4.74c-1.67-.37-3.4-.57-5.17-.57C10.75,0,0,10.75,0,24s10.75,24,24,24,24-10.75,24-24c0-1.78-.2-3.51-.57-5.17l-4.74,1.9Z'
            />
          </g>
        </svg>
      ) : (
        <section>
          <form ref={formRef} onSubmit={sendEmail} className='hidden'>
            <input type='text' name='name' value={name} onChange={handleData} required />
            <input name='phone_number' value={phone_number} onChange={handleData} required />
            <input name='count' value={count} onChange={handleData} required />
          </form>
          <Fade direction='up' triggerOnce className='w-full'>
            <h1 className='mb-4 text-lg font-bold'>잔여 {TICKETS - reserveLength!}석</h1>
            <form className='flex flex-col text-center items-center gap-4 mb-16 rounded-2xl p-8 w-full backdrop-blur-sm shadow-lg bg-black/70'>
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
                <input
                  id='agree'
                  type='checkbox'
                  className='border-none'
                  onChange={() => setIsAgree((prev) => !prev)}
                />
                <label htmlFor='agree' className='text-xs'>
                  개인정보제공에 동의합니다.
                </label>
              </div>
              <button
                disabled={isFilled ? false : true}
                type='submit'
                onClick={onClickReserve}
                className={
                  'h-12 p-2 w-full mt-2' + ' ' + [!isFilled ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white']
                }
              >
                제출하기
              </button>
            </form>
            <ReservationSection />
          </Fade>
        </section>
      )}
    </main>
  );
};

export default Reservation;
