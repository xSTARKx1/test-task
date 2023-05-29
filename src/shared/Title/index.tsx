import styles from './index.module.css';
interface Props {
  text: string;
}

const Title = (props: Props) => {
  const { text } = props;

  return <h1 className={styles.text}>{text}</h1>;
};

export default Title;
