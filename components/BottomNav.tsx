'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const buttonData = [
  { id: 1, path: '/', title: '홈' },
  { id: 2, path: '/reservation', title: '예매하기' },
  { id: 3, path: '/setlist', title: '셋리스트' },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className='flex w-screen h-14 p-4 fixed bottom-0 justify-between bg-primary/80 backdrop-blur-sm divide-x-[1px] divide-gray-500'>
      {buttonData.map((button) => {
        return (
          <Link
            key={button.id}
            href={button.path}
            className={`w-full text-center ${pathname === button.path ? 'text-white' : 'text-gray-500'}`}
          >
            {button.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
