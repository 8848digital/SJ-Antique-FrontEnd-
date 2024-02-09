import React from 'react';
import styles from '../styles/readyReceipts.module.css';

const ReadOnlyInputFieldComponent = ({ value }: any) => {
  return (
    <input
      type="number"
      className={`table_row ${styles.input_field} text-end`}
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      // id={id}
      // name={id}
      readOnly
      value={value}
      // onChange={onChange}
      // onKeyDown={(e) => handleKeyDown(e, 'custom_hm_pcs')}
      // ref={inputRef}
    />
  );
};

export default ReadOnlyInputFieldComponent;
