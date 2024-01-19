import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../../styles/header.module.css';

const ReceiptsHeader = ({
  showReceipt,
  setShowReceipts,
  showSales,
  setShowSales,
  showMaster,
  setShowMaster,
  showReport,
  setShowReport,
}: any) => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');
  const value = pathcontent[1];

  useEffect(() => {
    if (value === 'readyReceipt') {
      setShowReceipts(true);
    }
    if (value === 'master') {
      setShowMaster(true);
    }
    if (value === 'sales') {
      setShowSales(true);
    }
    if (value === 'report') {
      setShowReport(true);
    }
  }, [setShowMaster, setShowReceipts, setShowSales, setShowReport, value]);

  const handleReadyRecipt = (val: any) => {
    switch (val) {
      case 'Receipts':
        setShowReceipts(true);
        setShowSales(false);
        setShowMaster(false);
        setShowReport(false);
        break;
      case 'Sales':
        setShowSales(true);
        setShowReceipts(false);
        setShowMaster(false);
        setShowReport(false);
        break;
      case 'Master':
        setShowMaster(true);
        setShowReceipts(false);
        setShowSales(false);
        setShowReport(false);
        break;
      case 'Report':
        setShowMaster(false);
        setShowReceipts(false);
        setShowSales(false);
        setShowReport(true);
        break;
      default:
        setShowMaster(true);
        setShowReceipts(false);
        setShowSales(false);
        setShowReport(false);
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-2 col-md-3 col-3 text-center">
          <Link className="text-decoration-none btn-margin" href="/master">
            <button
              className={`${styles.button} ${showMaster ? 'activeColor' : ''}`}
              onClick={() => handleReadyRecipt('Master')}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Master
            </button>
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-6 text-center">
          <Link
            className="text-decoration-none btn-margin"
            href="/readyReceipt/kundan"
          >
            <button
              onClick={() => handleReadyRecipt('Receipts')}
              className={`${styles.button} ${
                showReceipt ? 'activeColor' : ''
              } `}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Ready Receipts
            </button>
          </Link>
        </div>
        <div className="col-lg-2 col-md-3 col-3 text-center">
          <Link
            className="text-decoration-none btn-margin"
            href="/sales/customerSale"
          >
            <button
              className={`${styles.button} ${showSales ? 'activeColor' : ''}`}
              onClick={() => handleReadyRecipt('Sales')}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Sales
            </button>
          </Link>
        </div>
        <div className="col-lg-2 col-md-3 col-3 text-center">
          <Link className="text-decoration-none btn-margin" href="/report">
            <button
              className={`${styles.button} ${showReport ? 'activeColor' : ''}`}
              onClick={() => handleReadyRecipt('Report')}
            >
              <i
                className="fa-regular fa-file icons-color mr-2"
                style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
              ></i>
              Report
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ReceiptsHeader;
