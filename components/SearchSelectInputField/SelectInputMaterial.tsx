import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';

const SelectInputMaterial = ({
  materialListData,
  materialWeight,
  setMaterialWeight,
  id,
  setSelectedMaterial,
  selectedMaterial
}: any) => {
  const inputRef = useRef<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState();
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);

  console.log('check material', materialListData);

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
        console.log(item, 'modalItem')
        if (i === id) {
          return { ...item, material: 0 || selectedDropdownValue };
        }
        return item;
      });
    console.log(updatedModalData, 'modal data');
    setMaterialWeight(updatedModalData);
    setSelectedMaterial(query)
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

  const handleSelectedOption = (iid:any,field:any,data: any) => {
    console.log('dataa', data);
    setSelectedDropdownValue(data);
    setShowDropdown(false);
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, i: any) => {
        if (i === id) {
          return { ...item, [field]: 0 || data };
        }
        return item;
      });
    console.log(updatedModalData, 'modal data');
    setMaterialWeight(updatedModalData);
    setSelectedMaterial(data)
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
        name="material"
        className={` ${styles.table_select}`}
        id="exampleInputEmail1"
        placeholder="Material Name"
        onChange={HandleSelectInputField}
        onClick={handleShowDropdown}
        value={selectedDropdownValue}
        defaultValue={materialListData?.karigar_name}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        ref={inputRef}
      />
      {showDropdown && (
        <ul className=" dropdown-ul-list border">
          {noRecords === false && filterDropdownList?.length === 0 ? (
            <>
              {materialListData?.length > 0 &&
              materialListData !== null &&
              materialListData.map((name: any, i: any) => (
                <li
                  key={i}
                  onClick={(e) => handleSelectedOption(i,'material',name.material)}
                  className="dropdown-list"
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
                    onClick={(e) => handleSelectedOption(i,'material',name.material)}
                    className="dropdown-list"
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
