import React from 'react';
import styles from '../styles/readyReceipts.module.css';
import { useRouter } from 'next/router';

const ReadOnlyInputFieldComponent = ({ value }: any) => {
  const { query } = useRouter()
  console.log("query in input compo", query)
  return (
    <input
      type="number"
      className={`table_row ${query?.hasOwnProperty("saleId") ? styles.customer_sale_input_field : styles.input_field} text-end`}

      // className={`table_row ${styles.input_field} text-end`}
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
