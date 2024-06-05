import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/header.module.css';
import { useRouter } from 'next/router';

const ReportHeader = () => {
  const {query} = useRouter()
  return (
    <div className="d-flex justify-content-center flex-wrap">
      <Link
        href="/report/daily-qty-status"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${
            query?.reportId === 'daily-qty-status' ? 'activeColor' : ''
          }`}
        >
          Daily Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report/product-code"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${
            query?.reportId === 'product-code' ? 'activeColor' : ''
          }`}
        >
          Product Code
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report/daily-summary-report"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${
            query?.reportId === 'daily-summary-report' ? 'activeColor' : ''
          }`}
        >
          Daily Summary Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report/customer-wise-report"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${
            query?.reportId === 'customer-wise-report' ? 'activeColor' : ''
          }`}
        >
          Customer Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report/karigar-wise-report"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${
            query?.reportId === 'karigar-wise-report' ? 'activeColor' : ''
          }`}
        >
          Karigar Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report/item-wise-report"
        className="text-decoration-none btn-margin"
      >
        <button
          className={`${styles.button} ${
            query?.reportId === 'item-wise-report' ? 'activeColor' : ''
          }`}
        >
         Item Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
    </div>
  );
};

export default ReportHeader;
