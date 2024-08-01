import { SelectedOptionsListProps } from "./types";
import styles from './SelectedOptionsList.module.css';

export default function SelectedOptionsList({options}: SelectedOptionsListProps) {
  return (
    <div className={styles.card}>
      <ul>
        {options.length ? (
          options.map((option) => {
            return (
              <li key={option.id} className={styles.option}>
                {option.label}
              </li>
            );
          })
        ) : (
          <p className={styles.info}>Not selected option yet...</p>
        )}
      </ul>
    </div>
  );
}
