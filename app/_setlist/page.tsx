'use client';

import { Fade } from 'react-awesome-reveal';
import um from '@/public/image/um.svg';
import sun from '@/public/image/sun.svg';
import ball from '@/public/image/ball.svg';
import tube from '@/public/image/tube.svg';
import Image from 'next/image';

const songs = [
  {
    icon: um,
    teamName: '요석의 유진한 은채',
    setlists: [
      { singer: '브로큰발렌타인', songName: 'Alien' },
      { singer: 'Nirvana', songName: 'Lithium' },
      { singer: 'YB', songName: '열아홉' },
      { singer: 'Muse', songName: 'Starlight' },
      { singer: '무한궤도', songName: '그대에게' },
    ],
  },
  {
    icon: sun,
    teamName: '문제가 두배',
    setlists: [
      { singer: '요루시카', songName: '비와 카푸치노' },
      { singer: '유라', songName: '수영해' },
      { singer: '달 좋은 밤', songName: 'Liar' },
      { singer: 'Ellen Varner', songName: 'Only wanna give it to you(백예린 cov.)' },
      { singer: 'Bishop Briggs', songName: 'River' },
    ],
  },
  {
    icon: ball,
    teamName: '도레미파솔↗레',
    setlists: [
      { singer: 'Richard Sanderson', songName: 'Reality(The volunteers cov.)' },
      { singer: '송지연', songName: 'I was a car(백다연 cov.)' },
      { singer: '(여자)아이들', songName: 'Allergy' },
      { singer: 'The Volunteers', songName: 'S.A.D' },
      { singer: '아이유', songName: '있잖아' },
    ],
  },
  {
    icon: tube,
    teamName: '연합팀',
    setlists: [
      { singer: 'Muse', songName: 'Plug in baby' },
      { singer: '브로큰발렌타인', songName: '무제' },
      { singer: 'Halestoem', songName: 'Get lucky' },
    ],
  },
];

const SetList = () => {
  return (
    <main className='w-full flex h-full flex-col items-center p-4 relative overflow-x-hidden pt-10 pb-24'>
      <div className='flex flex-col gap-10 backdrop-blur-md rounded-lg h-full'>
        {songs.map((song, idx) => (
          <Fade key={idx} direction={idx % 2 === 0 ? 'right' : 'left'} triggerOnce>
            <section className='mt-8 text-center text-primary'>
              <div className='flex items-center justify-center gap-3 mb-6'>
                <Image src={song.icon} alt='아이콘' width={idx === 0 ? 35 : 30} height={idx === 0 ? 35 : 30} />
                <h1 className='text-4xl font-bold text-gray-400'>{song.teamName}</h1>
              </div>
              {/* </Fade> */}

              {/* <Fade direction={idx % 2 === 0 ? 'right' : 'left'} triggerOnce> */}
              <div className='flex flex-col gap-2'>
                {song.setlists.map((list, idx) => (
                  <p key={idx}>
                    {list.singer} - {list.songName}
                  </p>
                ))}
              </div>
            </section>
          </Fade>
        ))}
      </div>
    </main>
  );
};

export default SetList;
