import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/readyReceipts.module.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import SelectInputKunKarigar from '../SearchSelectInputField/SelectInputKunKarigar';
import SelectInputMaterial from '../SearchSelectInputField/SelectInputMaterial';
const ModalMaster = ({
  handleModalFieldChange,
  handleAddRow,
  materialWeight,
  setMaterialWeight,
  materialListData,
  calculateRowValue,
  handleDeleteChildTableRow,
  readOnlyFields,
  selectedDropdownValue,
  setSelectedDropdownValue,
  handleTabPressOnModal,
}: any) => {
  console.log('material in modal', materialListData);

  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedAbbr, setSelectedAbbr] = useState('');
  // const returnAbbr = (i:any) =>{
  //   materialListData
  //   .filter(
  //     (names: any) => names.material
  //     === selectedMaterial
  //   )
  //   .map((name: any) => {
  //     console.log(name.material_abbr ,"materiallll")
  //     setSelectedAbbr(name.material_abbr)
  //   })
  //   materialWeight?.length > 0 &&
  //     materialWeight?.map((item: any) => {
  //       console.log(item, 'modalItem')
  //       if (i === item.idx) {
  //         return { ...item, material: 0 || selectedAbbr };
  //       }
  //       return item;
  //     }
  //     )
  
  // }

  const handleAbbr = (i:any, value:any) =>{
    console.log('entered in handle abbr')
      materialListData
    .filter(
      (names: any) => names.material
      === selectedMaterial
    )
    .map((name: any) => {
      console.log(name.material_abbr ,"abbr name")
      setSelectedAbbr(name.material_abbr)
    })
    
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any) => {
        if (i === item.id) {
          return { ...item, material: 0 || selectedAbbr };
        }
        return item;
      });
      console.log(updatedModalData, "abbr modal")
  }

  console.log(selectedMaterial, 'selected material modal')
  return (
    <>
      <Modal.Body>
        <div className="container d-flex justify-content-end">
          <button
            className="btn btn-link"
            onClick={() => handleAddRow('modalRow')}
          >
            Add Row
          </button>
        </div>
        <div className="container-lg table">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th className="thead" scope="col">
                  Sr. no
                </th>
                <th className="thead" scope="col">
                  Material Abbr (Master)
                </th>
                <th className="thead" scope="col">
                  Material (Master)<span className="text-danger">*</span>
                </th>
                <th className="thead" scope="col">
                  Pcs
                </th>
                <th className="thead" scope="col">
                  Piece @
                </th>
                <th className="thead" scope="col">
                  Carat
                </th>
                <th className="thead" scope="col">
                  Carat @
                </th>
                <th className="thead" scope="col">
                  Weight
                </th>
                <th className="thead" scope="col">
                  Gm @
                </th>
                <th className="thead" scope="col">
                  Total
                </th>
                <th className="thead" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {materialWeight?.length > 0 &&
                materialWeight?.map((element: any, i: any) => (
                  <>
                  {console.log(element,'element test')}
                  <tr key={i}>
                    <td className="table_row">{i + 1}</td>
                    <td className="table_row">
                    {/* <input
                        className={`${styles.input_field}`}
                        type='text'
                        readOnly
                        required
                        onChange={(e) =>
                        handleAbbr(i, e.target.value)
                        }
                        value={element.material_abbr}
                      /> */}
                      <select
                        className={`${styles.table_select}`}
                        name="material_abbr"
                        id="material_abbr"
                        value={element.material_abbr}
                        onChange={(e) => {
                          // Update the selected value and filter options for the first select field
                          console.log('entered in handle abbr')

                          handleAbbr(i, e.target.value)
                          // handleModalFieldChange(
                          //   i,
                          //   'modalRow',
                          //   'material_abbr',
                          //   e.target.value
                          // );
                        }}
                      >
                        {materialListData
                          .filter(
                            (names: any) => names.material
                            === selectedMaterial
                          )
                          .map((name: any, index:any) => {
                            console.log(i ,"material i")
                            return (
                              <option key={index} value={name.material_abbr}>
                              {name.material_abbr}
                            </option>
                            )
                          })}
                      </select>
                    </td>
                    <td className="table_row">
                      {/* <select
                        className={`${styles.table_select}`}
                        name="material"
                        id="material"
                        value={element.material}
                        onChange={(e) => {
                          // handleSelectFieldChange(e, i);
                          handleModalFieldChange(
                            i,
                            'modalRow',
                            'material',
                            e.target.value
                          );
                        }}
                      >
                        {materialListData?.length > 0 && (
                          <>
                            {materialListData?.map((names: any, i: any) => (
                              <option key={i} value={names.material}>
                                {names.material}
                              </option>
                            ))}
                          </>
                        )}
                      </select> */}
                      <SelectInputMaterial
                        materialListData={materialListData}
                        materialWeight={materialWeight}
                        setMaterialWeight={setMaterialWeight}
                        id={i}
                        selectedMaterial={selectedMaterial}
                        setSelectedMaterial={setSelectedMaterial}
                        setSelectedAbbr={setSelectedAbbr}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field}`}
                        type="number"
                        value={element.pcs}
                        onChange={(e) =>
                          handleModalFieldChange(
                            i,
                            'modalRow',
                            'pcs',
                            +e.target.value
                          )
                        }
                        readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field}`}
                        type="number"
                        value={element.piece_}
                        onChange={(e) =>
                          handleModalFieldChange(
                            i,
                            'modalRow',
                            'piece_',
                            +e.target.value
                          )
                        }
                        readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field}`}
                        type="number"
                        value={element.carat}
                        onChange={(e) =>
                          handleModalFieldChange(
                            i,
                            'modalRow',
                            'carat',
                            +e.target.value
                          )
                        }
                        readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field}`}
                        type="number"
                        value={element.carat_}
                        onChange={(e) =>
                          handleModalFieldChange(
                            i,
                            'modalRow',
                            'carat_',
                            +e.target.value
                          )
                        }
                        readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field}`}
                        type="number"
                        value={element.weight}
                        onChange={(e) =>
                          handleModalFieldChange(
                            i,
                            'modalRow',
                            'weight',
                            +e.target.value
                          )
                        }
                        readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={` ${styles.input_field}`}
                        type="number"
                        value={element.gm_}
                        onChange={(e) =>
                          handleModalFieldChange(
                            i,
                            'modalRow',
                            'gm_',
                            +e.target.value
                          )
                        }
                        readOnly={readOnlyFields}
                      />
                    </td>
                    <td className="table_row">
                      <input
                        className={`${styles.input_field}`}
                        type="number"
                        readOnly
                        disabled
                        onChange={(e) =>
                          handleModalFieldChange(
                            i,
                            'modalRow',
                            'amount',
                            +e.target.value
                          )
                        }
                        value={calculateRowValue(i)}
                      />
                    </td>
                    <td className="table_row">
                      <button
                        className="d-flex align-items-center delete-link p-1 border-0"
                        onClick={() => handleDeleteChildTableRow(i)}
                        onKeyDown={(e) => handleTabPressOnModal(e, element.idx)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: 'red', fontSize: 20 }}
                        />
                      </button>
                    </td>
                  </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
    </>
  );
};

export default ModalMaster;
