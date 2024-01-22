import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/header.module.css';
import { useRouter } from 'next/router';

const ReportHeader = () => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  const saleReturnValue =
    (pathcontent?.length > 0 &&
      pathcontent !== null &&
      pathcontent?.includes('salereturns')) ||
    pathcontent?.includes('saleReturns');
  const itemStatusReportValue =
    pathcontent?.length > 0 &&
    pathcontent !== null &&
    (pathcontent?.includes('itemStatusReport') ||
      pathcontent?.includes('itemStatusReport'));

  const [active, setActive] = useState(0);
  return (
    <div className="d-flex justify-content-center">
      <Link
        href="/report/itemStatusReport"
        className="text-decoration-none btn-margin"
        onClick={() => setActive(1)}
      >
        <button
          className={`${styles.button} ${
            itemStatusReportValue ? 'activeColor' : ''
          } `}
        >
          Item Status Report
          <i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
      <Link
        href="/report"
        className="text-decoration-none btn-margin"
        onClick={() => setActive(0)}
      >
        <button
          className={`${styles.button} ${saleReturnValue ? 'activeColor' : ''}`}
        >
          Report 2<i className="fa-solid fa-arrow-turn-down mx-2 pt-1"></i>
        </button>
      </Link>
    </div>
  );
};

export default ReportHeader;
