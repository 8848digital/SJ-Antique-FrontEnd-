import React from 'react';

const DailyStatusReportHeading = () => {
  return (
    <thead>
      <tr>
        <th colSpan={2} scope="colgroup" className="thead"></th>
        <th colSpan={3} scope="colgroup" className="thead">
          Jama
        </th>
        <th colSpan={3} scope="colgroup" className="thead">
          Nama
        </th>
      </tr>
      <tr>
        {/* thead bg-primary bg-opacity-50 text-dark */}
        <th scope="col" className="thead ">
          Sr.No.
        </th>
        <th scope="col" className="thead ">
          Name
        </th>
        <th scope="col" className="thead ">
          Net Wt
        </th>
        <th scope="col" className="thead ">
          Gross Wt
        </th>
        <th scope="col" className="thead ">
          Pcs
        </th>
        <th scope="col" className="thead ">
          Net Wt
        </th>
        <th scope="col" className="thead ">
          Gross Wt
        </th>
        <th scope="col" className="thead ">
          Pcs
        </th>
      </tr>
    </thead>
  );
};

export default DailyStatusReportHeading;
