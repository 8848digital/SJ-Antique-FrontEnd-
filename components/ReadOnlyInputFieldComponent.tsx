import React from 'react'
import styles from '../styles/readyReceipts.module.css';


const ReadOnlyInputFieldComponent = ({ value }: any) => {
    return (
        <div>
            <input
                type="number"
                className={` ${styles.input_field} text-end`}
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
        </div>
    )
}

export default ReadOnlyInputFieldComponent