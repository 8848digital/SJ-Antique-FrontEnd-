import React from 'react';
import ReadOnlyInputFieldComponent from '../ReadOnlyInputFieldComponent';

const TotalReadOnlyRow = ({ calculationRow }: any) => {
  return (
    <>
      <tr>
        <td className='text-center' colSpan={3}>Total</td>
        <td>
          <ReadOnlyInputFieldComponent value={calculationRow.custom_net_wt} />
        </td>
        <td>
          <ReadOnlyInputFieldComponent value={calculationRow.custom_few_wt} />
        </td>
        <td>
          <ReadOnlyInputFieldComponent value={calculationRow.custom_mat_wt} />
        </td>
        <td>
          <ReadOnlyInputFieldComponent value={calculationRow.custom_gross_wt} />
        </td>
        <td>
          <ReadOnlyInputFieldComponent value={calculationRow.custom_bb_pcs} />
        </td>
        <td>
          <ReadOnlyInputFieldComponent value={calculationRow.custom_other} />
        </td>
        <td>
          <ReadOnlyInputFieldComponent value={calculationRow.custom_total} />
        </td>
        <td>
          <ReadOnlyInputFieldComponent value={""} />

        </td>
      </tr>
    </>
  );
};

export default TotalReadOnlyRow;
