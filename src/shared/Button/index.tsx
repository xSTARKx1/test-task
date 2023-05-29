import { MouseEventHandler } from 'react';
import styles from './index.module.css';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  label: string;
  onClick?: () => MouseEventHandler<HTMLButtonElement>;
}

const DateInput = (props: Props) => {
  const { type = 'button', label, onClick } = props;

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default DateInput;
