import { useState } from 'react'
import styled from '../../styles/report.module.css'
import CommonFilters from './CommonReport/CommonFilters'
import ReportListingTable from './CommonReport/ReportListingTable'
import ReportHeader from '../Header/ReportHeader'

const ReadyStockSummaryReport = ({
    isLoading,
    reportData,
    readyStockSummaryReportData,
    searchInputValues,
    handleSearchInput,
    HandleSerachReport,
    clientNameData,
    karigarNameData,
    itemListData,
    categoryData,
}: any) => {
    const [tableViewData, setTableViewData] = useState<any>(20);

    // console.log("readyStockSummaryReportData", readyStockSummaryReportData)
    const HandleTableViewRows: any = (data: any) => {
        if (data !== 5) {
            setTableViewData(data);
        }
    };

    const zeroToTwentyHeaders =
        readyStockSummaryReportData?.zeroToTwenty?.length > 0 && readyStockSummaryReportData?.zeroToTwenty[0] ? Object.keys(readyStockSummaryReportData?.zeroToTwenty[0]) : []
    const twentyToFiftyHeaders =
        readyStockSummaryReportData?.twentyToFifty?.length > 0 && readyStockSummaryReportData?.twentyToFifty[0] ? Object.keys(readyStockSummaryReportData?.twentyToFifty[0]) : []
    const fiftyToHundredHeaders =
        readyStockSummaryReportData?.fiftyToHundred?.length > 0 && readyStockSummaryReportData?.fiftyToHundred[0] ? Object.keys(readyStockSummaryReportData?.fiftyToHundred[0]) : []
    const hundredToOnefiftyHeaders =
        readyStockSummaryReportData?.hundredToOnefifty?.length > 0 && readyStockSummaryReportData?.hundredToOnefifty[0] ? Object.keys(readyStockSummaryReportData?.hundredToOnefifty[0]) : []

    // console.log("twentyToHundredHeaders", zeroToTwentyHeaders)
    return (
        <>
            <div className={`mx-4 `}>
                <ReportHeader />
                <CommonFilters
                    searchInputValues={searchInputValues}
                    handleSearchInput={handleSearchInput}
                    handleSearchBtn={HandleSerachReport}
                    clientNameData={clientNameData}
                    karigarNameData={karigarNameData}
                    itemListData={itemListData}
                    categoryData={categoryData}
                />

                <div className={`${styled.scrollable_div} mt-3`}>
                    <div className={`${styled.table_container} mx-5 px-3`}>
                        <h5 className='text-center my-2'>0-20GMS</h5>
                        <ReportListingTable
                            headers={zeroToTwentyHeaders} reportData={readyStockSummaryReportData?.zeroToTwenty} tableViewData={tableViewData}
                        />

                    </div>
                    <div className={`${styled.table_container} mx-5 px-3`}>
                        <h5 className='text-center my-2'>20-50GMS</h5>
                        <ReportListingTable
                            headers={twentyToFiftyHeaders} reportData={readyStockSummaryReportData?.twentyToFifty} tableViewData={tableViewData}
                        />
                    </div>
                    <div className={`${styled.table_container} mx-5 px-3`}>
                        <h5 className='text-center my-2'>50-100GMS</h5>
                        <ReportListingTable
                            headers={fiftyToHundredHeaders} reportData={readyStockSummaryReportData?.fiftyToHundred} tableViewData={tableViewData}
                        />
                    </div>
                    <div className={`${styled.table_container} mx-5 px-3`}>
                        <h5 className='text-center my-2'>100-150GMS</h5>
                        <ReportListingTable
                            headers={hundredToOnefiftyHeaders} reportData={readyStockSummaryReportData?.hundredToOnefifty} tableViewData={tableViewData}
                        />
                    </div>
                </div>
            </div >
        </>
    )
}

export default ReadyStockSummaryReport