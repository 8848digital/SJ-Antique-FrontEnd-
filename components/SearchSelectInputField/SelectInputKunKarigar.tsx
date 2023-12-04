import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';

const SelectInputKunKarigar = ({
  kundanKarigarData,
  defaultValue,
  tableData,
  setTableData,
  placeholderValue,
  id,
  setStateForDocStatus,
  readOnlyFields,
  kunKarigarDropdownReset,
}: any) => {
  const inputRef = useRef<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('');
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const [scrollIndex, setScrollIndex] = useState(0);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleShowDropdown = () => {
    if (!readOnlyFields) {
      setShowDropdown(!showDropdown);
      setSelectedIndex(-1);
      setFilterDropdownList(kundanKarigarData);
    }
  };

  useEffect(() => {
    if (
      kunKarigarDropdownReset !== undefined &&
      kunKarigarDropdownReset === true
    )
      setSelectedDropdownValue('');
  }, [kunKarigarDropdownReset, selectedDropdownValue]);

  const handleSelectedOption = (data: any, i: any) => {
    setSelectedDropdownValue(data?.karigar_name);
    setShowDropdown(false);
    setSelectedIndex(i !== undefined ? i : -1);
    const updatedData = tableData.map((item: any) => {
      if (item.idx === id) {
        return { ...item, custom_kun_karigar: 0 || data?.karigar_name };
      }
      return item;
    });
    setTableData(updatedData);
    if (setStateForDocStatus !== undefined) {
      setStateForDocStatus(true);
    }
  };

  const handleDocumentClick = (e: any) => {
    if (
      e?.target !== inputRef?.current &&
      !inputRef?.current?.contains(e.target)
    ) {
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (!readOnlyFields) {
      if (e.key === 'ArrowDown' && !showDropdown) {
        e.preventDefault();
        setShowDropdown(true);
        setSelectedIndex(-1);
        setFilterDropdownList(kundanKarigarData);
      } else if (e.key === 'ArrowDown' && showDropdown) {
        setSelectedIndex((prevIndex: any) =>
          prevIndex < filterDropdownList?.length - 1 ? prevIndex + 1 : prevIndex
        );
        setScrollIndex((prevScrollIndex) =>
          Math.min(prevScrollIndex + 1, filterDropdownList?.length - 1)
        );
      } else if (e.key === 'ArrowUp' && showDropdown) {
        e.preventDefault();
        setSelectedIndex((prevIndex: any) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
        setScrollIndex((prevScrollIndex) => Math.max(prevScrollIndex - 1, 0));
      } else if (
        (e.key === 'Enter' || e.keyCode === 13) &&
        showDropdown &&
        selectedIndex !== -1
      ) {
        e.preventDefault();
        handleSelectedOption(filterDropdownList[selectedIndex], selectedIndex);
      }
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
      const selectedItem = dropdownRef.current.childNodes[
        selectedIndex
      ] as HTMLElement;
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
        className={` ${styles.table_select}`}
        placeholder={`${
          placeholderValue !== undefined ? placeholderValue : 'Kundan Karigar'
        }`}
        onChange={(e) => {
          if (!readOnlyFields) {
            setShowDropdown(true);
          }
          setSelectedDropdownValue(e.target.value);
          const query = e.target.value;
          const updatedFilterList: any =
            kundanKarigarData?.length > 0 &&
            kundanKarigarData.filter((item: any) => {
              return (
                item.karigar_name
                  ?.toLowerCase()
                  ?.indexOf(query?.toLowerCase()) !== -1
              );
            });
          setFilterDropdownList(updatedFilterList);
          setNoRecordsFound(true);
          const updatedData =
            tableData?.length > 0 &&
            tableData !== null &&
            tableData.map((item: any) => {
              if (item.idx === id) {
                return {
                  ...item,
                  custom_kun_karigar: 0 || selectedDropdownValue,
                };
              }
              return item;
            });
          setTableData(updatedData);
          if (setStateForDocStatus !== undefined) {
            setStateForDocStatus(true);
          }
          handleKeyDown(e);
        }}
        onClick={handleShowDropdown}
        value={selectedDropdownValue || defaultValue}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        ref={inputRef}
        readOnly={readOnlyFields}
      />
      {showDropdown && (
        <ul className=" dropdown-ul-list border" ref={dropdownRef}>
          {noRecords === false && filterDropdownList?.length === 0 ? (
            <>
              {kundanKarigarData?.length > 0 &&
                kundanKarigarData !== null &&
                kundanKarigarData.map((name: any, i: any) => (
                  <li
                    key={i}
                    onClick={() => handleSelectedOption(name, i)}
                    className={`dropdown-list ${
                      i === selectedIndex ? 'selected' : ''
                    }`}
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
                    onClick={() => handleSelectedOption(name, i)}
                    className={`dropdown-list ${
                      i === selectedIndex ? 'selected' : ''
                    }`}
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

export default SelectInputKunKarigar;
