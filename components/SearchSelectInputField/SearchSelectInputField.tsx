import React, { useEffect, useRef, useState } from 'react';

const SearchSelectInputField = ({
  karigarData,
  recipitData,
  setRecipitData,
  defaultValue,
  kundanKarigarData,
  selectedDropdownValue,
  setSelectedDropdownValue,
  setStateForDocStatus,
  placeholder,
}: any) => {
  const inputRef = useRef<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [selectedDropdownValue, setSelectedDropdownValue] = useState();
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);
  //const [masterData, setMasterData] = useState<any>();

  console.log('check karigar', karigarData);
  console.log(typeof [karigarData], 'type ');
  // useEffect(() => {
  //   if (karigarData?.length > 0) {
  //     setMasterData(karigarData);
  //   }
  // }, []);
  // console.log('master state', masterData);
  const HandleSelectInputField = (e: any) => {
    console.log('input field', e.target.value);
    setShowDropdown(true);
    setSelectedDropdownValue(e.target.value);
    const query = e.target.value;

    const UpdatedFilterList: any = karigarData?.filter((item: any) => {
      return (
        item.karigar_name?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1
      );
    });
    setFilterDropdownList(UpdatedFilterList);
    setNoRecordsFound(true);
    if (setRecipitData !== undefined) {
      setRecipitData({ ...recipitData, custom_karigar: selectedDropdownValue });
    }
    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }
  };

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      setShowDropdown(true);
    }
    if (e.key === 'Escape') {
      setShowDropdown(!showDropdown);
    }
  };

  const handleSelectedOption = (data: any) => {
    console.log('dataa', data);
    setSelectedDropdownValue(data);
    setShowDropdown(false);
    if (setRecipitData !== undefined) {
      setRecipitData({ ...recipitData, custom_karigar: data });
    }
    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }
  };
  console.log(selectedDropdownValue, 'selected value');
  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      // Check if the input element itself was clicked
      if (
        e?.target !== inputRef?.current &&
        !inputRef?.current?.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        name="custom_karigar"
        className="form-control input-sm border border-secondary"
        id="exampleInputEmail1"
        placeholder={placeholder}
        onChange={HandleSelectInputField}
        onClick={handleShowDropdown}
        value={selectedDropdownValue}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        ref={inputRef}
      />
      {showDropdown && (
        <ul className=" dropdown-ul-list border">
          {noRecords === false && filterDropdownList?.length === 0 ? (
            <>
              {karigarData?.length > 0 &&
                karigarData !== null &&
                karigarData.map((name: any, i: any) => (
                  <li
                    key={i}
                    onClick={() => handleSelectedOption(name.karigar_name)}
                    className="dropdown-list"
                  >
                    {name.karigar_name}
                  </li>
                ))}
            </>
          ) : (
            <>
              {filterDropdownList.map((name: any, i: any) => (
                <li
                  key={i}
                  onClick={() => handleSelectedOption(name.karigar_name)}
                  className="dropdown-list"
                >
                  {name.karigar_name}
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
};
export default SearchSelectInputField;
