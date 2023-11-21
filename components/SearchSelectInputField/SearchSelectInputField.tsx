import { useEffect, useRef, useState } from 'react';

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
  className,

}: any) => {
  const inputRef = useRef<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
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
    console.log('input field11', e.target.value);
    setShowDropdown(true);
    setSelectedDropdownValue(e.target.value);
    const query = e.target.value;

    const UpdatedFilterList: any =
      karigarData?.length > 0 &&
      karigarData.filter((item: any) => {
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
    setSelectedIndex(-1);
  };
  const handleKeyDown = (e:any) => {
    if (e.key === 'ArrowDown' && !showDropdown) {
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else if (e.key === 'ArrowDown' && showDropdown) {
      
      console.log(selectedIndex,'selectedIndex handleKey')
      setSelectedIndex((prevIndex:any) => (prevIndex + 1 )
      );
    } else if (e.key === 'ArrowUp' && showDropdown) {
      setSelectedIndex((prevIndex:any) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === 'Enter' && showDropdown && selectedIndex !== -1) {
      handleSelectedOption(filterDropdownList[selectedIndex]);
    }
  };
  console.log(selectedIndex,'selectedIndex handleKey')

  const handleSelectedOption = (data: any) => {
    console.log('dataa11', data.karigar_name);
    setSelectedDropdownValue(data.karigar_name);
    setShowDropdown(false);
    if (setRecipitData !== undefined) {
      setRecipitData({ ...recipitData, custom_karigar: data.karigar_name });
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
        className={className}
        id="exampleInputEmail1"
        placeholder={placeholder}
        onBlur={() => setShowDropdown(false)}
        onChange={HandleSelectInputField}
        onClick={handleShowDropdown}
        value={selectedDropdownValue}
        defaultValue={defaultValue}
        onKeyDown={(e)=>handleKeyDown(e)}
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
                    onClick={() => handleSelectedOption(name)}
                    className={`dropdown-list ${i === selectedIndex ? 'selected' : ''}`}
                  >
                    {name.karigar_name}
                  </li>
                ))}
            </>
          ) : (
            <>
              {filterDropdownList?.length > 0 &&
                filterDropdownList !== null &&
                filterDropdownList.map((name: any, i: any) => (
                  <li
                    key={i}
                    onClick={() => handleSelectedOption(name)}
                    className={`dropdown-list ${i === selectedIndex ? 'selected' : ''}`}
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
