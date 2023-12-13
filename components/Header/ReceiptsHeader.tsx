import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/header.module.css';
import ReadyReceiptsTabs from '../KundanReadyReceipts/ReadyReceiptsTabs';
const ReceiptsHeader = () => {
  const [showReceipt, setShowReceipts] = useState<any>(false);
  const [showSales, setShowSales] = useState<any>(false);
  const [showMaster, setShowMaster] = useState<any>(false);

  const router = useRouter();
  console.log(router, 'header router');
  const pathcontent = router?.asPath?.split('/');
  console.log(pathcontent, 'pathcontent header');
  const value = pathcontent[1];
  console.log(value, 'value header');
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
  }, []);

  const handleReadyRecipt = (val: any) => {
    switch (val) {
      case 'Receipts':
        setShowReceipts(true);
        setShowSales(false);
        setShowMaster(false);
        break;
      case 'Sales':
        setShowSales(true);
        setShowReceipts(false);
        setShowMaster(false);
        break;
      case 'Master':
        setShowMaster(true);
        setShowReceipts(false);
        setShowSales(false);
        break;
      default:
        setShowMaster(true);
        setShowReceipts(false);
        setShowSales(false);
    }
  };

  return (
    <div>
      <div className={styles.button_container}>
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
        <Link
          className="text-decoration-none btn-margin"
          href="/readyReceipt/kundan"
        >
          <button
            onClick={() => handleReadyRecipt('Receipts')}
            className={`${styles.button} ${showReceipt ? 'activeColor' : ''} `}
          >
            <i
              className="fa-regular fa-file icons-color mr-2"
              style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
            ></i>
            Ready Receipts
          </button>
        </Link>
        <Link className="text-decoration-none btn-margin" href="/sales">
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
      <ReadyReceiptsTabs
        showReceipt={showReceipt}
        showSales={showSales}
        showMaster={showMaster}
      />
    </div>
  );
};

export default ReceiptsHeader;
