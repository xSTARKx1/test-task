import { ChangeEvent } from 'react';
import styles from '../index.module.css';

interface Props {
  name: string;
  label: string;
  onChange: (e: ChangeEvent) => void;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  error: undefined | string;
  touched: undefined | boolean;
  value: string;
}

const SelectInput = (props: Props) => {
  const { options, value, name, label, touched, onChange, error } = props;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        className={error && touched ? styles.inputError : styles.input}
        onChange={onChange}
        value={value || 'default'}
      >
        <option value='default' disabled hidden>
          Choose here
        </option>
        {options.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>

      {error && touched ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};

export default SelectInput;
