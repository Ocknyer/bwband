import { place, date, price, capacity, teams } from '@/constant';
import React from 'react';
import { Fade } from 'react-awesome-reveal';
import MapSection from './MapSection';

const styles = {
  alignLeft: 'flex flex-col gap-y-3 items-start justify-center text-center mt-16',
  alignRight: 'flex flex-col gap-y-3 items-end justify-center text-right',
  headerText: 'text-lg font-bold text-primary',
  headerTextWhite: 'text-lg font-bold text-white',
  infoText: 'text-sm text-gray-500',
  infoTextWhite: 'text-sm text-gray-50',
};

const BasicInfoSection = () => {
  return (
    <section className='w-full mt-10'>
      {/* left */}
      <Fade direction='up' triggerOnce>
        <div className={styles.alignLeft}>
          <p className={styles.headerText}>{date.title}</p>
          <p className={styles.infoText}>{date.content}</p>
        </div>
      </Fade>

      <Fade direction='up' triggerOnce>
        <div className={styles.alignLeft}>
          <p className={styles.headerText}>{place.title}</p>
          <p className={styles.infoText}>{place.content}</p>
        </div>
      </Fade>

      <Fade direction='up' triggerOnce>
        <div className={styles.alignLeft}>
          <p className={styles.headerText}>{capacity.title}</p>
          <p className={styles.infoText}>{capacity.content}</p>
        </div>
      </Fade>

      <Fade direction='up' triggerOnce>
        <div className={styles.alignLeft}>
          <p className={styles.headerText}>{price.title}</p>
          <p className={styles.infoText}>{price.content}</p>
        </div>
      </Fade>
      {/* right */}
      <Fade direction='up' triggerOnce>
        <div className={styles.alignRight}>
          <p className={styles.headerTextWhite}>{teams.title}</p>
          <p className={styles.infoTextWhite}>{teams.content[0]}</p>
          <p className={styles.infoTextWhite}>{teams.content[1]}</p>
        </div>
      </Fade>
    </section>
  );
};

export default BasicInfoSection;
