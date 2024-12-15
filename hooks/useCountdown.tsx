'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function useCountdown(targetTime: string) {
  const [remainingTime, setRemaingTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentTime = dayjs();
      const targetDate = dayjs(targetTime);
      const nextDay = targetDate.add(1, 'day').startOf('day');

      if (currentTime.isAfter(targetDate) && currentTime.isBefore(nextDay)) {
        setRemaingTime('D-DAY');
        setIsLoading(false);
        return;
      }

      if (currentTime.isAfter(nextDay)) {
        setRemaingTime('End');
        setIsLoading(false);
        return;
      }

      const diffDays = targetDate.startOf('day').diff(currentTime.startOf('day'), 'day');

      const duration = dayjs.duration(targetDate.diff(currentTime));
      const hours = String(duration.hours()).padStart(2, '0');
      const minutes = String(duration.minutes()).padStart(2, '0');
      const seconds = String(duration.seconds()).padStart(2, '0');

      if (diffDays === 0) {
        setRemaingTime(`${hours} : ${minutes} : ${seconds}`);
      } else {
        setRemaingTime(`D-${diffDays} | ${hours} : ${minutes} : ${seconds}`);
      }

      setIsLoading(false);
    };

    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(intervalId);
  }, [targetTime]);

  return {
    remainingTime,
    isLoading,
  };
}
