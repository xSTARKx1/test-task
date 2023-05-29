import { Radio, RadioChangeEvent } from 'antd';

import styles from './index.module.css';

interface Props {
  data: { value: string; label: string }[];
  label: string;
  name: string;
  onChange: (e: RadioChangeEvent) => void;
  error: undefined | string;
  touched: undefined | boolean;
  value: string;
}

const List = (props: Props) => {
  const { data, value, name, touched, onChange, label, error } = props;

  return (
    <div className={styles.wrapper}>
      <h3>{label}</h3>
      {data.length > 0 ? (
        <Radio.Group
          className={styles.list}
          onChange={onChange}
          name={name}
          value={value}
        >
          {data.map(({ value, label }) => {
            return (
              <Radio value={value} key={value} className={styles.item}>
                <div>{label}</div>
              </Radio>
            );
          })}
        </Radio.Group>
      ) : (
        <div className={styles.empty}>No data</div>
      )}
      {error && touched ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};

export default List;
