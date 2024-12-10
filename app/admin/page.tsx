'use client';

import React, { useEffect, useState } from 'react';
import { getDocs, addDoc, collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import fireStore from '@/firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebasedb from '@/firebase/firebasedb';
import { formatTimeStamp } from '@/utils/utils';
import useCopyClipboard from '@/hooks/useCopyClipboard';
import { useVh } from '@/hooks/useVh';

const Admin = () => {
  const { copyToClipboard } = useCopyClipboard();
  const vh = useVh();
  const auth = getAuth(firebasedb);

  const [initialData, setInitialData] = useState<any[]>([]);
  const [dataList, setDataList] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [dataLength, setDataLength] = useState<string>();
  const [filterText, setFilterText] = useState<string>('');
  const [email, setEmail] = useState('admin@email.com');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('로그인 상태');
        setIsLogin(true);
      } else {
        console.log('로그아웃 상태');
        setIsLogin(false);
      }
    });
  }, [auth]);

  // 로그인
  const login = async (data: any) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('success');
    } catch (error) {
      console.log(error);
      alert('비밀번호가 일치하지 않습니다.');
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
    const q = query(collection(fireStore, 'psatbooker'), orderBy('createdAt', 'desc'));
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
    const docRef = doc(fireStore, 'psatbooker', String(id));

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

  return !isLogin ? (
    <main className='main-container' style={{ height: `${100 * vh}px` }}>
      <div className='flex flex-col items-center justify-center gap-2 h-dvh'>
        <input
          type='text'
          placeholder='아이디'
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
          className='h-12 p-2 border-solid border text-black text-base rounded-lg'
        />
        <input
          type='password'
          placeholder='비밀번호'
          name='password'
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
          className='h-12 p-2 border-solid border text-black text-base rounded-lg'
        />
        <button onClick={login} className='h-12 bg-primary text-white w-24 rounded-md'>
          로그인
        </button>
      </div>
    </main>
  ) : (
    <main className='main-container p-4 h-dvh'>
      <div className='flex flex-col fixed top-0 left-0 h-32 backdrop-blur-sm items-center justify-center w-full p-4 gap-2 z-10'>
        <div className='main-container flex w-full gap-2 md:p-4'>
          <input
            type='text'
            placeholder='검색'
            onInput={(e) => setFilterText(e.currentTarget.value)}
            className='h-12 p-2 border-solid border text-black text-base rounded-lg flex-1'
          />
          <button onClick={logout} className='h-12 bg-primary text-white w-24 rounded-md'>
            로그아웃
          </button>
        </div>
        <div className='flex gap-4'>
          <p className='text-xl font-bold'>
            폼 작성 수: <span className='text-orange-400'>{dataList.length}</span>
          </p>
          <p className='text-xl font-bold'>
            판매: <span className='text-orange-400'>{dataLength}</span>/110
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-2 pt-32 pb-24'>
        {dataList.map((data, idx) => (
          <div key={idx} className='bg-white rounded-lg p-4 relative'>
            <p className='absolute right-2 top-2 text-gray-500'>{data.id}</p>
            <div className='flex gap-2 items-center'>
              <p className='text-xl font-bold text-gray-600'>{data.name}</p>
              <p className='text-gray-500'>{data.count}매</p>
            </div>
            <p className='text-gray-600 text-lg font-bold'>
              전화번호:{' '}
              <span
                className='underline'
                onClick={() => copyToClipboard(data.phone_number, '전화번호가 복사되었습니다.')}
              >
                {data.phone_number}
              </span>
            </p>
            <p className='text-gray-600'>예매 날짜: {data.createdAt}</p>
            {!data.checked ? (
              <button
                onClick={() => updateCheckedState(data.id)}
                className='absolute right-2 bottom-2 text-white bg-primary px-2 py-1 rounded-md'
              >
                확인
              </button>
            ) : (
              <p className='absolute right-2 bottom-2 text-gray-400 bg-gray-300 px-2 py-1 rounded-md'>완료</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Admin;
