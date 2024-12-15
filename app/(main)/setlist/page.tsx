'use client';

import { Fade } from 'react-awesome-reveal';

const teamsData = [
  {
    teamName: 'Band JANSs',
    setlists: [{ singer: '', songName: '-' }],
    bgColor: 'bg-white/90',
    textColor: 'text-primary',
  },
  {
    teamName: 'The Rotten',
    setlists: [
      { singer: '쏜애플', songName: '청색증' },
      { singer: '쏜애플', songName: '한낮' },
      { singer: '쏜애플', songName: '살아있는 너의 밤' },
      { singer: '', songName: '' },
      { singer: '쏜애플', songName: '백치' },
      { singer: '쏜애플', songName: '로마네스크' },
      { singer: '쏜애플', songName: '살' },
      { singer: '', songName: '' },
      { singer: '쏜애플', songName: '너의 무리' },
      { singer: '쏜애플', songName: '어려운 달' },
      { singer: '', songName: '' },
      { singer: '쏜애플', songName: '은하' },
      { singer: '쏜애플', songName: '검은 별' },
      { singer: '', songName: '' },
      { singer: '쏜애플', songName: '물가의 라이온' },
      { singer: '쏜애플', songName: '빨간 피터' },
      { singer: '쏜애플', songName: '시퍼런 봄' },
      { singer: '쏜애플', songName: '멸종' },
    ],
    bgColor: 'bg-primary/80',
    textColor: 'text-white',
  },
];

const SetList = () => {
  return (
    <main className='main-container flex flex-col items-center px-6 pt-36 sm:pt-48 pb-24 sm:pb-40 gap-6'>
      {teamsData.map((team, index) => (
        <Fade key={index} direction='up' triggerOnce className='w-full'>
          <div className={`flex flex-col gap-10 backdrop-blur-md h-full p-6 ${team.bgColor}`}>
            <section className={`text-center ${team.textColor}`}>
              <div className='flex items-center justify-center gap-3 mb-6'>
                <h1 className='text-4xl font-bold font-capsSmall'>{team.teamName}</h1>
              </div>

              <div className='flex flex-col gap-2'>
                {team.setlists.map((list, idx) => (
                  <p key={idx}>{list.singer === '' ? <>&nbsp;</> : `${list.singer} - ${list.songName}`}</p>
                ))}
              </div>
            </section>
          </div>
        </Fade>
      ))}
    </main>
  );
};

export default SetList;
