import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';

const SelectInputMaterial = ({
  materialListData,
  materialWeight,
  setMaterialWeight,
  defaultValue,
  id,
  setSelectedMaterial,
  selectedMaterial,
  readOnlyFields,
  style
}: any) => {
  const inputRef = useRef<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState();
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<any>(-1);
  const dropdownRef = useRef<HTMLUListElement>(null);

  console.log('check material', materialListData);
  console.log(id, 'id222');

  const HandleSelectInputField = (e: any) => {
    console.log('input field', e.target.value);
    setShowDropdown(true);
    setSelectedDropdownValue(e.target.value);
    console.log(selectedDropdownValue, 'selectedDropdownValue');
    const query = e.target.value;

    const UpdatedFilterList: any = materialListData?.filter((item: any) => {
      return item.material?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1;
    });
    setFilterDropdownList(UpdatedFilterList);
    setNoRecordsFound(true);
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, i: any) => {
        console.log(item, 'modalItem');
        if (i === id) {
          return { ...item, material: 0 || selectedDropdownValue };
        }
        return item;
      });
    console.log(updatedModalData, 'modal data');
    setMaterialWeight(updatedModalData);
    setSelectedMaterial(query);
  };

  const handleShowDropdown = () => {
    if (!readOnlyFields) {
      setShowDropdown(!showDropdown);
      setSelectedIndex(-1);
      setFilterDropdownList(materialListData);
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowDown' && !showDropdown) {
      e.preventDefault();
      setShowDropdown(true);
      setSelectedIndex(-1);
      setFilterDropdownList(materialListData);
    } else if (e.key === 'ArrowDown' && showDropdown) {
      setSelectedIndex((prevIndex: any) =>
        prevIndex < filterDropdownList?.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp' && showDropdown) {
      e.preventDefault();
      setSelectedIndex((prevIndex: any) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      (e.key === 'Enter' || e.keyCode === 13) &&
      showDropdown &&
      selectedIndex !== -1
    ) {
      e.preventDefault();
      console.log(filterDropdownList[selectedIndex], 'filter selected index');

      HandleMaterialAbbr(filterDropdownList[selectedIndex]);
    }
  };
  const HandleAbbrKey = (e: any) => {
    if (
      (e.key === 'Enter' || e.keyCode === 13) &&
      showDropdown &&
      selectedIndex !== -1
    ) {
      e.preventDefault();
      console.log(filterDropdownList[selectedIndex], 'filter selected index');
      handleSelectedOption(filterDropdownList[selectedIndex]);
    }
  };

  const handleSelectedOption = (data: any) => {
    console.log('dataa', data);
    setSelectedDropdownValue(data.material);
    setShowDropdown(false);
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, i: any) => {
        if (i === id) {
          return { ...item, material: 0 || data?.material };
        }
        return item;
      });
    console.log(updatedModalData, 'modal abbr11');
    setMaterialWeight(updatedModalData);
    setSelectedMaterial(data);
  };
  const HandleMaterialAbbr = (name: any) => {
    console.log(name, 'name11');
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, index: any) => {
        if (index === id) {
          return { ...item, material_abbr: 0 || name?.material_abbr };
        }
        return item;
      });
    console.log(updatedModalData, 'modal abbr1');
    setMaterialWeight(updatedModalData);
  };
  console.log(materialWeight, 'materialWeight');

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
    <div className='dropdown-wrapper'>
      <input
        type="text"
        name="material"
        className={` ${styles.table_select} `}
        id="exampleInputEmail1"
        placeholder="Material Name"
        onChange={(e) => {
          HandleSelectInputField(e);
          handleKeyDown(e);
        }}
        onClick={handleShowDropdown}
        value={selectedDropdownValue}
        // defaultValue={materialListData?.karigar_name}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        onKeyUp={HandleAbbrKey}
        autoComplete="off"
        ref={inputRef}
      />
      {showDropdown && (
        <ul className={`dropdown-ul-list border `} ref={dropdownRef}>
          {noRecords === false && filterDropdownList?.length === 0 ? (
            <>
              {materialListData?.length > 0 &&
                materialListData !== null &&
                materialListData.map((name: any, i: any) => (
                  <li
                    key={i}
                    onClick={(e) => {
                      handleSelectedOption(name);
                    }}
                    onMouseDown={() => HandleMaterialAbbr(name)}
                    // onKeyDown={(e)=>HandleAbbrKey(e)}
                    className={`dropdown-list ${
                      i === selectedIndex ? 'selected' : ''
                    }`}
                  >
                    {name.material}
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
                    onClick={(e) => {
                      handleSelectedOption(name);
                    }}
                    // onKeyDown={(e)=>HandleAbbrKey(e)}
                    onMouseDown={() => HandleMaterialAbbr(name)}
                    className={`dropdown-list ${
                      i === selectedIndex ? 'selected' : ''
                    }`}
                  >
                    {name.material}
                  </li>
                ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
};
export default SelectInputMaterial;
