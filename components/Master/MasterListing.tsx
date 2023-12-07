import Link from 'next/link';
import styles from '../../styles/header.module.css';
const MasterListing: any = ({ value }: any) => {
  return (
    <div>
      <div className="container-lg p-0">
        <div className="d-flex justify-content-center">
          <Link
            href="/master/karigar"
            className="text-decoration-none btn-margin"
          >
            <button
              className={`${styles.button} ${
                value === 'karigar' ? 'activeColor' : ''
              }`}
            >
              Karigar
              <i className="fa-solid fa-arrow-turn-down mx-1  pt-1"></i>
            </button>
          </Link>
          <Link
            href="/master/kundanKarigar"
            className="text-decoration-none btn-margin"
          >
            <button
              className={`${styles.button} ${
                value === 'kundanKarigar' ? 'activeColor' : ''
              }`}
            >
              Kundan Karigar
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
          <Link
            href="/master/material"
            className="text-decoration-none btn-margin"
          >
            <button
              className={`${styles.button} ${
                value === 'material' ? 'activeColor' : ''
              }`}
            >
              Material
              <i className="fa-solid fa-arrow-turn-down mx-1 pt-1"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MasterListing;
