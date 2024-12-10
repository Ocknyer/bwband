import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function useCountdown(targetTime: string) {
  const [remainingTime, setRemaingTime] = useState('');

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentTime = dayjs();
      const targetDate = dayjs(targetTime);
      const duration = dayjs.duration(targetDate.diff(currentTime));

      const days = String(duration.days());
      const hours = String(duration.hours()).padStart(2, '0');
      const minutes = String(duration.minutes()).padStart(2, '0');
      const seconds = String(duration.seconds()).padStart(2, '0');

      if (Number(days) > 0) {
        setRemaingTime(`${days}일  ${hours} : ${minutes} : ${seconds}`);
      } else {
        setRemaingTime(`${hours} : ${minutes} : ${seconds}`);
      }
    };

    const intervalId = setInterval(calculateRemainingTime, 1000); //1초마다 불러오기
    return () => clearInterval(intervalId);
  }, [targetTime]);

  return {
    remainingTime,
  };
}
