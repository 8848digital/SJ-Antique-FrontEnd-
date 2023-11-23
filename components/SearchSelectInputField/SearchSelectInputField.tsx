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
  style,
}: any) => {
  const inputRef = useRef<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
    setSelectedIndex(-1);
    setFilterDropdownList(karigarData)
  };

  const handleSelectedOption = (data: any, i: any) => {
    setSelectedDropdownValue(data?.karigar_name);
    setShowDropdown(false);
    setSelectedIndex(i !== undefined ? i : -1);
    if (setRecipitData !== undefined) {
      setRecipitData({ ...recipitData, custom_karigar: data?.karigar_name });
    }
    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }
  };

  const handleDocumentClick = (e: any) => {
    // Check if the input element itself was clicked
    if (e?.target !== inputRef?.current && !inputRef?.current?.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowDown' && !showDropdown) {
      e.preventDefault();
      setShowDropdown(true);
      setSelectedIndex(-1);
      setFilterDropdownList(karigarData )
    } else if (e.key === 'ArrowDown' && showDropdown) {
      // setSelectedIndex((prevIndex: any) => ( prevIndex + 1));
      setSelectedIndex((prevIndex:any) =>
          prevIndex < filterDropdownList?.length - 1 ? prevIndex + 1 : prevIndex
        );
      setScrollIndex((prevScrollIndex) => Math.min(prevScrollIndex + 1, filterDropdownList?.length - 1));
    } else if (e.key === 'ArrowUp' && showDropdown) {
      e.preventDefault();
      setSelectedIndex((prevIndex: any) => (prevIndex > 0 ? prevIndex - 1 : 0));
      setScrollIndex((prevScrollIndex) => Math.max(prevScrollIndex - 1, 0));
    } else if ((e.key === 'Enter' || e.keyCode === 13) && showDropdown && selectedIndex !== -1) {
      e.preventDefault();
      handleSelectedOption(filterDropdownList[selectedIndex], selectedIndex);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      const selectedItem = dropdownRef.current.childNodes[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, showDropdown]);

  return (
    <div>
      <input
        type="text"
        name="custom_karigar"
        className={className}
        placeholder={placeholder}
        onBlur={() => setShowDropdown(false)}
        onChange={(e) => {
          setShowDropdown(true);
          setSelectedDropdownValue(e.target.value);
          const query = e.target.value;
          const updatedFilterList: any =
            karigarData?.length > 0 &&
            karigarData.filter((item: any) => {
              return item.karigar_name?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1;
            });
          setFilterDropdownList(updatedFilterList);
          setNoRecordsFound(true);
          if (setRecipitData !== undefined) {
            setRecipitData({ ...recipitData, custom_karigar: selectedDropdownValue });
          }
          if (setStateForDocStatus !== undefined) {
            setStateForDocStatus(true);
          }
          handleKeyDown(e)
        }}
        onMouseDown={handleShowDropdown}
        value={selectedDropdownValue}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        ref={inputRef}
      />
      {showDropdown && (
        <ul className={`dropdown-ul-list border ${style}`} ref={dropdownRef}>
          {noRecords === false && filterDropdownList?.length === 0 ? (
            <>
              {karigarData?.length > 0 &&
                karigarData !== null &&
                karigarData.map((name: any, i: any) => (
                  <li
                    key={i}
                    onMouseDown={() => handleSelectedOption(name, i)}
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
                    onMouseDown={() => handleSelectedOption(name, i)}
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
