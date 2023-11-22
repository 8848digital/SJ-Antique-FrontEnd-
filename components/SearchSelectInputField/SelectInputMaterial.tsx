import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';
import { DEV_CLIENT_PAGES_MANIFEST } from 'next/dist/shared/lib/constants';

const SelectInputMaterial = ({
  materialListData,
  materialWeight,
  setMaterialWeight,
  defaultValue,
  id,
  setSelectedMaterial,
  selectedMaterial,
}: any) => {
  const inputRef = useRef<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState();
  const [noRecords, setNoRecordsFound] = useState(false);
  const [filterDropdownList, setFilterDropdownList] = useState([]);

  console.log('check material', materialListData);
  console.log(id,'id222')

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

  const handleSelectedOption = (iid: any, field: any, data: any) => {
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
    console.log(updatedModalData, 'modal abbr11');
    setMaterialWeight(updatedModalData);
    setSelectedMaterial(data);
  };
  const HandleMaterialAbbr =(name:any)=>{
    console.log(name,'name11')
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, index: any) => {
        if (index === id) {
          return { ...item, material_abbr: 0 || name?.material_abbr };
        }
        return item;
      });
      console.log(updatedModalData,'modal abbr1')
      setMaterialWeight(updatedModalData);
    }
    console.log(materialWeight,'materialWeight')

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
        onChange={(e)=>HandleSelectInputField(e)}
        onClick={handleShowDropdown}
        value={selectedDropdownValue}
        // defaultValue={materialListData?.karigar_name}
        defaultValue={defaultValue}
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
                    onClick={(e) =>{
                      handleSelectedOption(i, 'material', name.material)
                      
                    }}
                    onMouseDown={()=>HandleMaterialAbbr(name)}
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
                    onClick={(e) =>{
                      handleSelectedOption(i, 'material', name.material)
                      
                    }}
                    onMouseDown={()=>HandleMaterialAbbr(name)}
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
