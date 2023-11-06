import React, { useState } from 'react';

const CurrentDate = () => {
  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  };
  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <input
      type="text border border-secondary"
      className="form-control input-sm border-secondary"
      value={currentDate}
      readOnly
      disabled
    />
  );
};

export default CurrentDate;