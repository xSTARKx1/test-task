import { FC } from 'react';

import { FindDoctorForm } from './widgets';

import styles from './App.module.css';

const App: FC = () => {
  return (
    <div className={styles.wrapper}>
      <FindDoctorForm />
    </div>
  );
};

export default App;
