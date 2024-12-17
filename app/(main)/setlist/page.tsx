'use client';

import { Fade } from 'react-awesome-reveal';

const teamsData = [
  {
    teamName: 'Band JANSs',
    setlists: [
      { singer: '하현상', songName: '불꽃놀이' },
      { singer: '한로로', songName: '비틀비틀 짝짜꿍' },
      { singer: '자우림', songName: '미안해 널 미워해' },
      { singer: 'Metallica', songName: 'Enter sandman' },
      { singer: 'Foo Fighters', songName: 'Walk' },
      { singer: 'Oasis', songName: 'Supersonic' },
      { singer: 'NELL', songName: 'Eden' },
      { singer: 'NELL', songName: '피터팬은 죽었다' },
      { singer: 'NELL', songName: '믿어선 안될 말' },
      { singer: 'NELL', songName: 'Stay' },
    ],
    bgColor: 'bg-white/90',
    textColor: 'text-primary',
  },
  {
    teamName: 'The Rotten',
    setlists: [
      { singer: '', songName: '청색증' },
      { singer: '', songName: '한낮' },
      { singer: '', songName: '살아있는 너의 밤' },
      { singer: '', songName: '' },
      { singer: '', songName: '백치' },
      { singer: '', songName: '로마네스크' },
      { singer: '', songName: '살' },
      { singer: '', songName: '' },
      { singer: '', songName: '너의 무리' },
      { singer: '', songName: '어려운 달' },
      { singer: '', songName: '' },
      { singer: '', songName: '은하' },
      { singer: '', songName: '검은 별' },
      { singer: '', songName: '' },
      { singer: '', songName: '물가의 라이온' },
      { singer: '', songName: '빨간 피터' },
      { singer: '', songName: '시퍼런 봄' },
      { singer: '', songName: '멸종' },
    ],
    bgColor: 'bg-primary/80',
    textColor: 'text-white',
  },
];

const SetList = () => {
  return (
    <main className='main-container flex flex-col items-center px-10 pt-40 pb-24 gap-10'>
      {teamsData.map((team, index) => (
        <Fade key={index} direction='up' triggerOnce className='w-full'>
          <div className={`flex flex-col gap-10 backdrop-blur-md h-full p-6 ${team.bgColor}`}>
            <section className={`text-center ${team.textColor}`}>
              <div className='flex items-center justify-center gap-3 mb-6'>
                <h1 className='text-4xl font-bold font-capsSmall'>{team.teamName}</h1>
              </div>

              <div className='flex flex-col gap-2'>
                {team.setlists.map((list, idx) => (
                  <p key={idx}>
                    {list.singer === '' && list.songName === '' ? (
                      <>&nbsp;</>
                    ) : list.singer === '' ? (
                      `${list.songName}`
                    ) : (
                      `${list.singer} - ${list.songName}`
                    )}
                  </p>
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
