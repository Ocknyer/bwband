/* eslint-disable react/no-unescaped-entities */
'use client';

import fireStore from '../../../firebase/firestore';
import { getDocs, addDoc, collection, query, orderBy, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import emailjs from '@emailjs/browser';
import { TICKETS } from '@/constant';
import ReservationSection from '@/components/ReservationSection';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Common/Spinner';
import ReservForm from '@/components/ReservForm';
import dayjs from 'dayjs';

export type Input = {
  name: string;
  count: string;
  phone_number: string;
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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    if (checkIsBooked(inputs)) {
      alert(
        '입력하신 휴대전화번호로 기존 예매 정보가 존재합니다.\n\n추가 예매를 원하시면 010-4138-8402(고유석)으로 문의 주시기 바랍니다.'
      );
      setInputs({ ...inputs, phone_number: '' });
      setIsLoading(false);
      return;
    }

    if (inputs.count && inputs.name && inputs.phone_number) {
      try {
        // 예매 정보 저장
        await setDoc(doc(fireStore, 'bwbandbooker', id as string), {
          ...inputs,
          createdAt: time,
          checked: false,
        });

        // 이메일 전송
        await sendEmail();

        // 세션스토리지에 예매 정보 저장
        sessionStorage.setItem('isBooked', 'true');
        sessionStorage.setItem('inputs', JSON.stringify(inputs));

        // 페이지 이동 (폼 초기화는 페이지 이동 후에 자동으로 이루어짐)
        router.push('/complete');
      } catch (error) {
        console.log(error);
        alert('예매 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('필수 정보를 입력해 주세요');
      setIsLoading(false);
    }
  };

  const isEnd = dayjs().isAfter(dayjs('2025-01-04T20:00:00'));

  return (
    <main className='main-container flex flex-col items-center justify-center w-full min-h-dvh px-6 pt-36 sm:pt-48 pb-20 sm:pb-36 '>
      {!dataList ? (
        <Spinner />
      ) : (
        <section className='flex flex-col items-center justify-center w-full'>
          {isEnd ? (
            <div className='flex flex-col items-center justify-center w-full'>
              <p className='text-2xl font-bold text-center'>공연이 종료되었습니다.</p>
            </div>
          ) : (
            <>
              <form ref={formRef} onSubmit={sendEmail} className='hidden'>
                <input type='text' name='name' value={name} onChange={handleData} required />
                <input name='phone_number' value={phone_number} onChange={handleData} required />
                <input name='count' value={count} onChange={handleData} required />
              </form>
              <Fade direction='up' triggerOnce className='w-full max-w-96 mx-auto'>
                <ReservForm
                  reserveLength={reserveLength as number}
                  name={name}
                  phone_number={phone_number}
                  count={count}
                  handleData={handleData}
                  onClick={onClickReserve}
                  setIsAgree={setIsAgree}
                  isFilled={isFilled}
                  isLoading={isLoading}
                />
                <ReservationSection />
              </Fade>
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default Reservation;
