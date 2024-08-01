import { forwardRef, useMemo, useDeferredValue, memo } from "react";
import clx from 'classnames';
import { OptionListType } from "./types";
import DeleteIcon from '../../assets/close.svg';
import { useScrollingRender } from "../../hooks/useScrollingRender";

import styles from './Selector.module.css';

const OptionsList = memo(
  forwardRef<HTMLUListElement, OptionListType>(function (
    { data, searchValue, onSelect, selectedOptions, handleDeleteOption, isVisible },
    ref
  ) {
    const deferredValue = useDeferredValue(searchValue);

    const filteredOptions = useMemo(() => {
      if (!deferredValue) {
        return data;
      }
      
      return data.filter((item) =>
        item.label.toLowerCase().includes(deferredValue.toLowerCase())
      );
    }, [deferredValue, data]);

    const lastRowToRender = useScrollingRender(
      20,
      filteredOptions.length,
      document.getElementById('content') as HTMLElement,
    );

    return (
      <ul id="content" ref={ref} className={clx(styles.options, {[styles.visible]: isVisible})}>
        {filteredOptions.length ? (
          filteredOptions.slice(0, lastRowToRender).map((option) => {
            return (
              <li
                onClick={(event) => onSelect(event, option)}
                className={clx(styles.option, {
                  [styles.selected]: selectedOptions[option.id],
                })}
                key={option.id}
              >
                {option.label}
                <img
                  src={option.icon}
                  className={styles.logo}
                  alt={option.icon}
                />
                {selectedOptions[option.id] && (
                  <img
                    onClick={(event) => handleDeleteOption(event, option.id)}
                    src={DeleteIcon}
                    className={styles.remove}
                    alt="remove"
                  />
                )}
              </li>
            );
          })
        ) : (
          <p className="info">No options</p>
        )}
      </ul>
    );
  })
);

export default OptionsList;