import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/readyReceipts.module.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
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
  console.log('material in modal', materialWeight);

  // Use an array to store the selected material for each row
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  // Use an array to store the selected abbreviation for each row
  const [selectedAbbrs, setSelectedAbbrs] = useState<string[]>([]);

  console.log('selected material', selectedMaterials, selectedAbbrs);
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
                  Material (Master)
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
                    {console.log(element, 'element test')}
                    <tr key={i}>
                      <td className="table_row">{i + 1}</td>
                      <td className="table_row">
                        <input
                          className={` ${styles.input_field}`}
                          type="text"
                          defaultValue={element.material_abbr}
                          value={element.material_abbr}
                          readOnly={readOnlyFields}
                        />
                      </td>
                      <td className="table_row">
                        <SelectInputMaterial
                          materialListData={materialListData}
                          materialWeight={materialWeight}
                          defaultValue={element?.material}
                          setMaterialWeight={setMaterialWeight}
                          id={i}
                          selectedMaterial={selectedMaterials[i] || ''}
                          setSelectedMaterial={(value: any) => {
                            setSelectedMaterials((prevMaterials) => {
                              const newMaterials = [...prevMaterials];
                              newMaterials[i] = value;
                              return newMaterials;
                            });
                          }}
                          readOnlyFields={readOnlyFields}
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
                              e.target.value
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
                              e.target.value
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
                              e.target.value
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
                              e.target.value
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
                              e.target.value
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
                              e.target.value
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
                              e.target.value
                            )
                          }
                          value={calculateRowValue(i)}
                        />
                      </td>
                      <td className="table_row">
                        <button
                          className="d-flex align-items-center delete-link p-1 border-0"
                          onClick={() => handleDeleteChildTableRow(i)}
                          onKeyDown={(e) =>
                            handleTabPressOnModal(e, element.idx)
                          }
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
