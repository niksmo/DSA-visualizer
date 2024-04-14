import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export function MainPage() {
  return (
    <main className={`${styles.content}`}>
      <div className={styles.title_box}>
        <h1
          className={`text text_type_h1 text_color_h1 noselect ${styles.title}`}>
          МБОУ АЛГОСОШ
        </h1>
        <p
          className={`text text_type_fibonacci text_color_secondary noselect ${styles.fibonacci_title}`}>
          им. Фибоначчи
        </p>
      </div>
      <div className={styles.cards_box} data-testid="navigation">
        <Link className={styles.link} to="/recursion">
          <div className={`${styles.card} ${styles.string}`} />
        </Link>
        <Link className={styles.link} to="/fibonacci">
          <div className={`${styles.card} ${styles.fibonacci}`} />
        </Link>
        <Link className={styles.link} to="/sorting">
          <div className={`${styles.card} ${styles.arr}`} />
        </Link>
        <Link className={styles.link} to="/stack">
          <div className={`${styles.card} ${styles.stack}`} />
        </Link>
        <Link className={styles.link} to="/queue">
          <div className={`${styles.card} ${styles.queue}`} />
        </Link>
        <Link className={styles.link} to="/list">
          <div className={`${styles.card} ${styles.list}`} />
        </Link>
      </div>
    </main>
  );
}
