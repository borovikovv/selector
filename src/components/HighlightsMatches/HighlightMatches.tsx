import { HighlightMatchesProps } from "./types";
import styles from './HighlightMatches.module.css';

export function HighlightMatches ({ label, searchText }: HighlightMatchesProps) {
  const index = label.toLowerCase().indexOf(searchText.toLocaleLowerCase());

  if (!label || !searchText) {
    return label;
  }

  if (index >= 0) {
    return (
      <>
        {label.substring(0, index)}
        <span className={styles.match}>
          {label.substring(index, index + searchText.length)}
        </span>
        {label.substring(index + searchText.length)}
      </>
    );
  }
};