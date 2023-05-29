import { ChangeEvent } from 'react';

import styles from '../index.module.css';

interface Props {
  name: string;
  label: string;
  onChange: (e: ChangeEvent) => void;
  value: string;
  error: undefined | string;
  touched: undefined | boolean;
}

const Field = (props: Props) => {
  const { name, label, value, onChange, error, touched } = props;
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        className={error && touched ? styles.inputError : styles.input}
        type='text'
        id={name}
        placeholder={label}
        value={value}
        onChange={onChange}
      />

      {error && touched && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Field;
