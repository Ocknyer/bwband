'use client';

import React, { useEffect, useState } from 'react';
import { getDocs, addDoc, collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import fireStore from '@/firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebasedb from '@/firebase/firebasedb';
import { formatTimeStamp } from '@/utils/utils';
import useCopyClipboard from '@/hooks/useCopyClipboard';
import { TICKETS } from '@/constant';
import Spinner from '@/components/Common/Spinner';
import BookingListCard from '@/components/Admin/BookingListCard';

const Admin = () => {
  const auth = getAuth(firebasedb);

  const [initialData, setInitialData] = useState<any[]>([]);
  const [dataList, setDataList] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [dataLength, setDataLength] = useState<string>();
  const [filterText, setFilterText] = useState<string>('');
  const [email, setEmail] = useState('yusuko20415@gmail.com');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('로그인 상태');
        setIsLogin(true);
      } else {
        console.log('로그아웃 상태');
        setIsLogin(false);
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // 로그인
  const login = async (data: any) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('success');
    } catch (error) {
      console.log(error);
      alert('비밀번호가 일치하지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃
  const logout = async (data: any) => {
    try {
      await signOut(auth);
      console.log('success');
    } catch (error) {
      console.log(error);
    }
  };

  const getReserveList = async () => {
    const q = query(collection(fireStore, 'bwbandbooker'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const reserveCount = querySnapshot.docs.reduce((acc, cur) => (acc += +cur.data().count), 0);
    setDataLength(String(reserveCount));

    const data = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: Number(doc.id),
        createdAt: formatTimeStamp(doc.data().createdAt.toDate()),
      };
    });

    setInitialData(data);
    setDataList(data);
  };

  const updateCheckedState = async (id: number) => {
    const docRef = doc(fireStore, 'bwbandbooker', String(id));

    let response;
    try {
      response = await updateDoc(docRef, { checked: true });
      getReserveList();
    } catch (error) {
      alert('수정할 수 없습니다.');
    }
  };

  useEffect(() => {
    getReserveList();
  }, []);

  useEffect(() => {
    if (filterText === '') {
      setDataList(initialData);
      return;
    }

    const filtered = initialData.filter(
      (item) => item.name.includes(filterText) || item.phone_number.includes(filterText)
    );

    setDataList(filtered);
  }, [filterText]);

  if (authChecking) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Spinner color='#ffffff' width={40} height={40} />
      </div>
    );
  }

  return !isLogin ? (
    <main className='main-container min-h-dvh'>
      <div className='flex flex-col items-center justify-center gap-4 h-dvh max-w-96 mx-auto p-6'>
        <input
          type='text'
          placeholder='아이디'
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
          className='h-12 p-2 border-solid border text-black text-base w-full'
        />
        <input
          type='password'
          placeholder='비밀번호'
          name='password'
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
          className='h-12 p-2 border-solid border text-black text-base w-full'
        />
        <button onClick={login} className='h-12 bg-primary text-white w-full flex items-center justify-center'>
          {loading ? <Spinner /> : '로그인'}
        </button>
      </div>
    </main>
  ) : (
    <main className='main-container h-dvh'>
      <div className='flex flex-col fixed top-0 left-0 h-32 backdrop-blur-sm bg-primary/70 items-center justify-center w-full p-4 gap-4 z-10'>
        <div className='main-container flex w-full gap-4 md:p-4'>
          <input
            type='text'
            placeholder='검색'
            onInput={(e) => setFilterText(e.currentTarget.value)}
            className='h-12 p-2 border-solid border text-black text-base flex-1 bg-gray-100'
          />
          <button onClick={logout} className='h-12 bg-gray-200 font-bold text-primary w-24'>
            로그아웃
          </button>
        </div>
        <div className='flex gap-4'>
          <p className='font-bold'>
            폼 작성 수: <span className='text-gray-400'>{dataList.length}</span>
          </p>
          <p className='font-bold'>
            판매: <span className='text-gray-400'>{dataLength}</span>/{TICKETS}
          </p>
        </div>
      </div>
      <ul className='flex flex-col gap-4 pt-36 pb-24 px-4'>
        {dataList.map((data, idx) => (
          <BookingListCard data={data} idx={idx} updateCheckedState={updateCheckedState} key={idx} />
        ))}
      </ul>
    </main>
  );
};

export default Admin;
