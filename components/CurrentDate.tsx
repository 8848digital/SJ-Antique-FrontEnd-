import { get_detail_delivery_note_data } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CurrentDate = ({ defaultKarigarData }: any) => {
  console.log('defaultKarigarData date', defaultKarigarData);
  const formatDate = (inputDate: Date) => {
    const formattedDate = inputDate.toLocaleDateString('en-GB');
    return formattedDate.replace(/\//g, '-');
  };

  const getDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  const [currentDate, setCurrentDate] = useState(getDate());

  const CurrentDateValue: any = () => {
    if (defaultKarigarData !== undefined && defaultKarigarData.length > 0) {
      const postingDate = new Date(defaultKarigarData[0]?.posting_date);
      return formatDate(postingDate);
    } else {
      return currentDate;
    }
  };

  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );

  console.log('datee', DetailOfDeliveryNoteFromStore);

  return (
    <input
      type="text border border-secondary"
      className="form-control input-sm border-secondary"
      // defaultValue={defaultKarigarData !== undefined && defaultKarigarData[0]?.posting_date}
      value={CurrentDateValue()}
      readOnly
      disabled
    />
  );
};

export default CurrentDate;
