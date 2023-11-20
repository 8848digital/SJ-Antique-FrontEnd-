import Link from 'next/link'
import styles from '../../styles/header.module.css'
import SalesHeader from '../Header/SalesHeader'
import { useState } from 'react'
import { useRouter } from 'next/router'

const ReadyReceiptsTabs:any = ({
    showMaster,
    showSales,
    showReceipt
}:any) => {
  const router = useRouter()
  console.log(router, 'routerTab')
  const pathcontent = router?.asPath?.split('/')
  console.log(pathcontent, 'pathcontentTab')
  const value = pathcontent[pathcontent?.length  - 1]
  console.log(value, 'valueTab')
  const [active, setActive]=useState(0)
  return (
    <div className=" justify-content-center">
        <div className="navbar d-flex justify-content-center p-0">
          <div>
            {showReceipt ? (
              <div className='d-flex justify-content-center'>
              <Link 
              href="/readyReceipt/kundan"
              className="text-decoration-none btn-margin"
              onClick={()=>setActive(0)}
               >
                <button
                  className={`${styles.button} ${value === 'kundan' ? 'activeColor':''}`}
                >
                  Ready Receipts (Kundan Karigar)
                  <i className='fa-solid fa-arrow-turn-down mx-2 pt-1'></i>
                </button> 
              </Link>
              <Link
                href="/readyReceipt/mangalsutra"
                className="text-decoration-none btn-margin"
                onClick={()=>setActive(1)}
              >
                <button
                  className={`${styles.button} ${value === 'mangalsutra' ? 'activeColor':''} `}
                >
                  Ready Receipts (Mangalsutra Karigar)
                  <i className='fa-solid fa-arrow-turn-down mx-2 pt-1'></i>
                </button>
              </Link>
            </div>
            ) : (
              ''
            )}
            {showSales ? <SalesHeader /> : ''}
            {showMaster ? '' : ''}
          </div>
        </div>
      </div>
  )
}

export default ReadyReceiptsTabs