import React from 'react'
import Link from 'next/link'
import SalesHeader from '../Header/SalesHeader'
import { useRouter } from 'next/router'

const ReadyReceiptsTabs:any = ({
    showMaster,
    showSales,
    showReceipt
}:any) => {
  const router = useRouter()
  console.log(router,'receipt header router')
  return (
    <div className=" justify-content-center">
        <div className="navbar d-flex justify-content-center p-0">
          <div>
            {showReceipt ? (
              <div
                className="nav nav-pills d-flex"
                id="pills-tab"
                role="tablist"
              >
                <Link
                  className="text-decoration-none nav-tabs tabs-container"
                  href="/readyReceipt/kundan"
                >
                  <button
                    className="nav-link border show active"
                    id="pills-kundan-tab"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    aria-controls="pills-kundan"
                    aria-selected="true"
                  >
                    Ready Receipts(Kundan Karigar)
                  </button>
                </Link>
                <Link
                  className="text-decoration-none nav-tabs tabs-container"
                  href="/readyReceipt/mangalsutra"
                >
                  <button
                    className="nav-link border"
                    id="pills-mangal-tab"
                    data-bs-toggle="pill"
                    type="button"
                    role="tab"
                    
                  >
                    Ready Receipts(Mangalsutra Karigar)
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