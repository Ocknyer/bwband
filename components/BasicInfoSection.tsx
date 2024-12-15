import { date, price, capacity } from '@/constant';
import { Fade } from 'react-awesome-reveal';

const styles = {
  alignLeft: 'flex flex-col gap-y-3 items-start justify-center text-center mt-16',
  alignRight: 'flex flex-col gap-y-3 items-end justify-center text-right',
  alignCenter: 'flex flex-col gap-y-3 items-center justify-center text-center mt-16',
  headerText: 'text-lg font-bold text-primary',
  headerTextWhite: 'text-lg font-bold text-white font-gongGothicMedium',
  infoText: 'text-sm text-gray-500',
  infoTextWhite: 'text-sm text-gray-50',
};

const BasicInfoSection = () => {
  return (
    <section className='w-full mt-10'>
      {/* left */}
      <Fade direction='up' triggerOnce duration={1000}>
        <div className={styles.alignCenter}>
          <p className={styles.headerTextWhite}>{date.title}</p>
          <p className={styles.infoTextWhite}>{date.content}</p>
        </div>
      </Fade>

      <Fade direction='up' triggerOnce duration={1000}>
        <div className={styles.alignCenter}>
          <p className={styles.headerTextWhite}>{capacity.title}</p>
          <p className={styles.infoTextWhite}>{capacity.content}</p>
        </div>
      </Fade>

      <Fade direction='up' triggerOnce duration={1000}>
        <div className={styles.alignCenter}>
          <p className={styles.headerTextWhite}>{price.title}</p>
          <p className={styles.infoTextWhite}>{price.content}</p>
        </div>
      </Fade>
    </section>
  );
};

export default BasicInfoSection;
