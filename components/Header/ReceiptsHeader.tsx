import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/header.module.css';
import { useRouter } from 'next/router';

const ReceiptsHeader = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('Master');

  const handleItemClick = (value: any) => {
    setActiveItem(value);
  };

  const headerData: any = [
    { label: 'Master', href: '/master' },
    { label: 'Ready Receipts', href: '/readyReceipt/kundan' },
    { label: 'Sales', href: '/sales/customerSale' },
    { label: 'Report', href: '/report' },
    { label: 'Barcode', href: '/barcode' },
  ];

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {headerData.map((item: any, index: any) => (
        <div key={index} className="btn-margin">
          {/* <Link href={item.href}> */}
          <button
            className={`${styles.button} ${
              activeItem === item.label ? 'activeColor' : ''
            }`}
            onClick={() => {
              handleItemClick(item.label);
              router.push(item.href);
            }}
          >
            <i
              className="fa-regular fa-file icons-color mr-2"
              style={{ color: '#CDAB6E', fontSize: 20, marginRight: '9px' }}
            ></i>
            {item.label}
          </button>
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
};

export default ReceiptsHeader;
