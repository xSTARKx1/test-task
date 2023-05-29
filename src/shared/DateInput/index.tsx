import { ChangeEvent } from 'react';
import styles from '../index.module.css';

interface Props {
  name: string;
  label: string;
  onChange: (e: ChangeEvent) => void;
  value: string | number | readonly string[] | undefined;
  error: undefined | string;
  touched: undefined | boolean;
}

const DateInput = (props: Props) => {
  const { name, label, value, touched, onChange, error } = props;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        type='date'
        id={name}
        className={error && touched ? styles.inputError : styles.input}
        style={{ width: '100%' }}
        value={value}
        onChange={onChange}
      />
      {error && touched ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};

export default DateInput;
