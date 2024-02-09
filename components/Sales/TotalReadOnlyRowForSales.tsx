import React from 'react'
import ReadOnlyInputFieldComponent from '../ReadOnlyInputFieldComponent'

const TotalReadOnlyRowForSales = ({ calculationRow }: any) => {
    return (
        <>
            <tr className="">
                <td className="text-center table_row py-1 " colSpan={2}>
                    Total
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_gross_wt} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_kun_wt} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_cs_wt} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_bb_wt} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_other_wt} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_net_wt} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_cs} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_cs_amt} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_kun_pc} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_kun} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_kun_amt} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_ot_} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_ot_amt} />
                </td>
                <td className="table_row py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_other} />
                </td>
                <td className="table_row px-0 py-1">
                    <ReadOnlyInputFieldComponent value={calculationRow.custom_amount} />
                </td>
            </tr>
        </>
    )
}

export default TotalReadOnlyRowForSales