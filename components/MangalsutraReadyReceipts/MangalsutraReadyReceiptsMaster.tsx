import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/readyReceipts.module.css';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { get_access_token } from '@/store/slices/auth/login-slice';
import getKarigarApi from '@/services/api/get-karigar-list-api';
import kundanKarigarApi from '@/services/api/get-kundan-karigar-list-api';
import materialApi from '@/services/api/get-material-list-api';
import purchaseReceiptApi from '@/services/api/post-purchase-receipt-api';
import postMaterialApi from '@/services/api/post-material-api';
import getPurchasreceiptListApi from '@/services/api/get-purchase-recipts-list-api';
// import KundanListing from './KundanReadyReceiptsListing';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';
import CurrentDate from '../CurrentDate';
import ModalMaster from '../ModalMaster/ModalMaster';
import KundanListing from '../KundanReadyReceipts/KundanReadyReceiptsListing';
import { ToastContainer, toast } from 'react-toastify';
import SelectInputKunKarigar from '../SearchSelectInputField/SelectInputKunKarigar';
import postUploadFile from '@/services/api/post-upload-file-api';

const MangalsutraReadyReceiptsMaster = () => {
  const inputRef = useRef<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [recipitData, setRecipitData] = useState({
    custom_karigar: ' ',
    remarks: '',
    custom_ready_receipt_type: 'Mangalsutra',
  });
  const [clickBtn, setClickBtn] = useState<boolean>(false);
  const [karigarData, setKarigarData] = useState<any>();
  const [kundanKarigarData, setKundanKarigarData] = useState<any>();
  const [materialListData, setMaterialListData] = useState<any>();
  const [indexVal, setIndexVal] = useState<any>();
  const [clicks, setClick] = useState<boolean>(false);
  const [activeModalId, setActiveModalId] = useState<any>(null);
  const [kundanListing, setKundanListing] = useState<any>([]);
  const loginAcessToken = useSelector(get_access_token);
  console.log(loginAcessToken, 'loginAcessToken');
  let disabledValue: any;
  const [materialWeight, setMaterialWeight] = useState<any>();
  const [tableData, setTableData] = useState<any>([
    {
      id: 1,
      product_code: '',
      custom_kun_karigar: '',
      custom_net_wt: '',
      custom_few_wt: '',
      custom_gross_wt: '',
      custom_mat_wt: '',
      custom_other: '',
      custom_total: '',
      custom_add_photo: '',
      totalModalWeight: 0,
      totalAmount: 0,
      table: [
        {
          id: materialWeight?.length + 1,
          material_abbr: '',
          material: '',
          pcs: '',
          piece_: '',
          carat: '',
          carat_: '',
          weight: '',
          gm_: '',
          amount: '',
        },
      ],
    },
  ]);

  useEffect(() => {
    const getStateData: any = async () => {
      const stateData: any = await getKarigarApi(loginAcessToken.token);
      const KundanKarigarAPI = await kundanKarigarApi(loginAcessToken.token);
      const materialListApi = await materialApi(loginAcessToken.token);
      console.log(KundanKarigarAPI, 'stateData');
      setKarigarData(stateData);
      setKundanKarigarData(KundanKarigarAPI);
      setMaterialListData(materialListApi);
    };
    getStateData();
  }, [loginAcessToken?.token]);
  console.log(karigarData, 'karigarData');
  const calculateRowValue = (i: any) => {
    console.log(i, 'i');
    return (
      materialWeight[i]?.pcs * materialWeight[i]?.piece_ +
      materialWeight[i]?.carat * materialWeight[i]?.carat_ +
      materialWeight[i]?.weight * materialWeight[i]?.gm_
    );
  };

  const handleFieldChange: any = (
    id: number,
    val: any,
    field: string,
    newValue: any,
    fileVal?: any
  ) => {
    const updatedData = tableData.map((item: any, i: any) => {
      if (item.id === id) {
        return { ...item, [field]: 0 || newValue };
      }
      return item;
    });
    console.log(updatedData, 'bbb');
    setTableData(updatedData);
    handleFileUpload(fileVal);
  };

  const handleFileUpload = async (fileVal: any) => {
    await postUploadFile(loginAcessToken.token, fileVal);
  };

  const handleModalFieldChange = (
    id: number,
    val: any,
    field: string,
    newValue: any
  ) => {
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, i: any) => {
        if (i === id) {
          return { ...item, [field]: 0 || newValue };
        }
        return item;
      });

    const newVal = tableData?.table?.filter(
      (item: any) => materialListData?.includes(item.material)
    );
    console.log(newVal, 'newVal');
    console.log(disabledValue, 'disabledValue');
    setMaterialWeight(updatedModalData);
  };

  const handleAddRow = (value: any) => {
    const newRow = {
      id: tableData.length + 1,
      product_code: '',
      custom_kun_karigar: '',
      custom_net_wt: '',
      custom_few_wt: '',
      custom_gross_wt: '',
      custom_mat_wt: '',
      custom_other: '',
      custom_total: '',
      custom_add_photo: '',
      table: [
        {
          id: materialWeight?.length + 1,
          material_abbr: '',
          material: '',
          pcs: '',
          piece_: '',
          carat: '',
          carat_: '',
          weight: '',
          gm_: '',
          amount: '',
        },
      ],
    };
    if (value === 'tableRow') {
      setTableData([...tableData, newRow]);
    } else {
      setMaterialWeight([...materialWeight, ...newRow?.table]);
    }
  };

  const handleModalAddRow = () => {
    const newModalRow = {
      id: materialWeight?.length + 1,
      material_abbr: '',
      material_name: '',
      pcs: '',
      piece_: '',
      carat: '',
      carat_: '',
      weight: '',
      gm_: '',
      amount: '',
    };
    setMaterialWeight([...materialWeight, newModalRow]);
  };
  const handleTabPress = (event: any, id: any) => {
    if (event.key === 'Tab' && id === tableData[tableData.length - 1].id) {
      handleAddRow('tableRow');
    }
  };

  const handleModal = (event: any, id: any, data: any) => {
    setIndexVal(id);
    console.log(tableData, 'materialWeight');
    // console.log(materialWeight, "materialWeight");
    const dataVal = tableData?.filter((item: any) => {
      if (item.id === id) {
        if (event.key === 'F2') {
          if (item.totalAmount > 0) {
            setMaterialWeight(item.table);
          } else {
            setMaterialWeight(data.table);
          }
          setShowModal(true);
        }
      }
    });
  };

  const handleSaveModal = async (id: any) => {
    const modalValue = materialWeight.map(
      ({
        pcs,
        piece_,
        carat,
        carat_,
        weight,
        gm_,
        amount,
        id,
        ...rest
      }: any) => ({
        ...rest,
      })
    );
    console.log(modalValue, 'modalValue');
    if (inputRef.current) {
      disabledValue = inputRef.current.value;
    } else {
      console.error('The ref to the input element is not available.');
    }

    const totalAmmount = materialWeight.map(
      ({
        pcs,
        piece_,
        carat,
        carat_,
        gm_,
        id,
        material_abbr,
        material,
        weight,
        ...rest
      }: any) => ({ ...rest })
    );
    console.log(totalAmmount, 'bfggh');
    const weightAddition = materialWeight.reduce((accu: any, val: any) => {
      console.log(accu, 'accu23');
      return accu + val.weight;
    }, 0);
    const updatedMaterialVal = materialWeight.map((item: any) => {
      return {
        ...item,
        amount: disabledValue,
      };
    });

    const totalvalues = materialWeight.map(
      (row: any) =>
        row.pcs * row.piece_ + row.carat * row.carat_ + row.weight * row.gm_
    );
    let numbers: any;
    if (Array.isArray(totalvalues) && totalvalues.length === 1) {
      numbers = totalvalues[0];
    } else {
      numbers = totalvalues.reduce((accu: any, val: any) => {
        return accu + val;
      }, 0);
    }
    // setTotalModalAmount(totalvalues);
    console.log(totalvalues, 'totalvalues ');
    const totalAmmountValues = totalvalues.reduce((accu: any, val: any) => {
      return accu + val;
    }, 0);
    console.log();
    const updatedMaterialWeight = tableData?.map((row: any, i: any) => {
      console.log(i, 'ij');
      console.log(id, 'ij');
      if (row.id === indexVal) {
        const numbersParsed = parseInt(numbers, 10);
        return {
          ...row,
          totalModalWeight: weightAddition,
          totalAmount: totalAmmountValues,
          table: materialWeight.map(({ id, ...rest }: any) => ({ ...rest })),
          custom_mat_wt: weightAddition,
          custom_gross_wt:
            parseInt(row.custom_net_wt, 10) +
            parseInt(row.custom_few_wt, 10) +
            weightAddition,
          custom_total: numbersParsed,
        };
      }
      return row;
    });
    console.log(updatedMaterialWeight, 'updatedMaterialWeight');
    const updatedDataVal = updatedMaterialWeight.map((row: any, i: any) => {
      if (row.id === indexVal) {
        return {
          ...row,
          table: row.table.map((tableItem: any) => ({
            ...tableItem,
            amount:
              (parseInt(tableItem.pcs, 10) || 0) *
              (parseInt(tableItem.piece_, 10) || 0) +
              (parseFloat(tableItem.carat) || 0) *
              (parseFloat(tableItem.carat_) || 0) +
              (parseFloat(tableItem.weight) || 0) *
              (parseFloat(tableItem.gm_) || 0),
          })),
        };
      }
      return row;
    });

    console.log(updatedDataVal, 'updatedDataVa');
    setTableData(updatedDataVal);
    if (totalvalues.length > 0) {
      setClickBtn(true);
    } else {
      setClickBtn(false);
    }
    const values = {
      version: 'v1',
      method: 'create_material',
      entity: 'material_post_api',
      items: modalValue,
    };
    console.log(updatedMaterialWeight, 'data45');
    const materialApiVal = await postMaterialApi(loginAcessToken.token, values);
    setShowModal(false);
  };
  const handleDeleteRow = (id: any) => {
    const updatedData = tableData.filter((item: any) => item.id !== id);
    setTableData(updatedData);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveModalId(null);
  };
  const handleRecipietChange = (e: any) => {
    setRecipitData({ ...recipitData, [e.target.name]: e.target.value });
  };
  console.log(recipitData, 'recipitData');
  const handleCreate = async () => {
    console.log(tableData, 'table56');
    const updatedtableData = tableData?.map((row: any, i: any) => {
      if (row.id === indexVal) {
        if (row.custom_other !== '' && row.custom_total !== '') {
          return {
            ...row,
            custom_total:
              parseInt(row.totalAmount) + parseInt(row.custom_other),
          };
        } else if (row.custom_other !== '') {
          return {
            ...row,
            custom_total: parseInt(row.custom_other),
          };
        } else {
          return {
            ...row,
            custom_total: parseInt(row.totalAmount),
          };
        }
      }
      return row;
    });

    console.log(updatedtableData, 'updatedtableData');
    const modalValue = updatedtableData?.map(
      ({ id, totalModalWeight, totalAmount, ...rest }: any) => ({
        ...rest,
      })
    );

    const values = {
      ...recipitData,
      items: modalValue,
    };
    console.log(values, 'vals');
    const isEmptyProductCode = values?.items?.some(
      (obj: any) => obj.product_code === ''
    );
    const isEmptyMaterial = values?.items?.some((obj: any) =>
      obj.table.some((vals: any) => vals.material === '')
    );
    const productVal = values.custom_karigar;
    console.log(isEmptyMaterial, 'finalVal');
    if (isEmptyProductCode || productVal === '') {
      toast.error('add Item code Or Karigar');
    } else if (isEmptyMaterial) {
      toast.error('please Enter Material Name');
    } else {
      const purchaseReceipt: any = await purchaseReceiptApi(
        loginAcessToken.token,
        values
      );
      if (purchaseReceipt.status === 200) {
        toast.success('Purchase Receipt Created Sucessfully');
      } else {
        toast.error('Error in Creating Purchase Receipt');
      }
    }
  };

  const handleDeleteChildTableRow = (id: any) => {
    const updatedData = materialWeight?.filter((item: any, i: any) => i !== id);
    setMaterialWeight(updatedData);
  };

  console.log(loginAcessToken, 'loginAcessToken');

  useEffect(() => {
    const getPurchaseList = async () => {
      const listData = await getPurchasreceiptListApi(
        loginAcessToken,
        'Mangalsutra'
      );
      console.log(listData, 'accu23');
      setKundanListing(listData);
    };

    getPurchaseList();
  }, [clicks, loginAcessToken]);
  console.log(calculateRowValue, 'accu23');
  return (
    <div className="container-lg">
      <div>
        <div
          className="nav nav-pills mb-3 justify-content-center "
          id="pills-tab"
          role="tablist"
        >
          <div className="nav-tabs tabs-container w-50 " role="presentation">
            <button
              className="nav-link active w-100 border p-1"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              onClick={() => setClick(true)}
            >
              Ready receipts (Mangalsutra karigar)
            </button>
          </div>
          <div className="nav-tabs tabs-container w-50 " role="presentation">
            <button
              className="nav-link  w-100 p-1 border"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Create new ready receipt
            </button>
          </div>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <KundanListing kundanListing={kundanListing} />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div>
              <div>
                <div className={`${styles.button_field}`}>
                  <button
                    type="button"
                    className={`${styles.create_button}`}
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th className="thead" scope="col">
                          Date
                        </th>
                        <th className="thead" scope="col">
                          Karigar(Supplier)
                          <span className="text-danger">*</span>
                        </th>
                        <th className="thead" scope="col">
                          Remarks
                        </th>
                        <th className="thead" scope="col">
                          Ready Raceipt Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row" className="table_row">
                          <CurrentDate />
                        </td>
                        <td className="table_row">
                          <SearchSelectInputField
                            karigarData={karigarData}
                            recipitData={recipitData}
                            setRecipitData={setRecipitData}
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className="form-control input-sm border border-secondary"
                            type="text"
                            name="remarks"
                            value={recipitData.remarks}
                            onChange={handleRecipietChange}
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className="form-control input-sm border border-secondary"
                            type="text"
                            readOnly
                            disabled
                            value={'Mangalsutra'}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="container d-flex justify-content-end p-0">
                <button
                  className={`btn btn-link p-0`}
                  onClick={() => handleAddRow('tableRow')}
                >
                  Add Row
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th className="thead" scope="col">
                        Sr. no
                      </th>
                      <th className="thead" scope="col">
                        Product Code (Item){' '}
                        <span className="text-danger">*</span>
                      </th>
                      <th className="thead" scope="col">
                        Kun Karigar
                      </th>
                      <th className="thead" scope="col">
                        Net Wt
                      </th>
                      <th className="thead" scope="col">
                        Few Wt
                      </th>
                      <th className="thead" scope="col">
                        Mat Wt
                      </th>
                      <th className="thead" scope="col">
                        Gross Wt
                      </th>

                      <th className="thead" scope="col">
                        Other
                      </th>
                      <th className="thead" scope="col">
                        Total
                      </th>
                      <th className="thead" scope="col">
                        Add Photo
                      </th>
                      <th className="thead" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData?.map((item: any, i: any) => (
                      <tr key={item.id}>
                        <td className="table_row ">{item.id}</td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="text"
                            value={item.product_code}
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'tableRow',
                                'product_code',
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="table_row">
                          <SelectInputKunKarigar
                            kundanKarigarData={kundanKarigarData}
                            tableData={tableData}
                            setTableData={setTableData}
                            item={item}
                            id={item.id}
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={item.custom_net_wt}
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'tableRow',
                                'custom_net_wt',
                                +e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={item.custom_few_wt}
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'tableRow',
                                'custom_few_wt',
                                +e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={tableData[i]?.totalModalWeight}
                            readOnly
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'tableRow',
                                'custom_mat_wt',
                                +e.target.value
                              )
                            }
                            onKeyDown={(e) => handleModal(e, item.id, item)}
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="text"
                            readOnly
                            disabled
                            name={`sum-${i + 1}`}
                            value={
                              tableData[i]?.totalModalWeight > 0
                                ? tableData[i].custom_net_wt +
                                tableData[i].custom_few_wt +
                                tableData[i]?.totalModalWeight
                                : tableData[i].custom_net_wt +
                                tableData[i].custom_few_wt
                            }
                          />
                        </td>

                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={item.custom_other}
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'tableRow',
                                'custom_other',

                                +e.target.value
                              )
                            }
                            onKeyDown={(e) => handleModal(e, item.id, item)}
                          />
                        </td>
                        <td className="table_row">
                          {' '}
                          <input
                            className={` ${styles.input_field}`}
                            type="text"
                            readOnly
                            disabled
                            name={`sum-${i + 1}`}
                            value={
                              tableData[i]?.totalAmount > 0
                                ? tableData[i].custom_other +
                                tableData[i]?.totalAmount
                                : tableData[i].custom_other
                            }
                          />
                        </td>
                        <td className="table_row">
                          {tableData[i].custom_add_photo && (
                            <span style={{ fontSize: '12px' }}>
                              {tableData[i].custom_add_photo}
                            </span>
                          )}
                          <input
                            className={` ${styles.input_field}`}
                            type="file"
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'tableRow',
                                'custom_add_photo',
                                `/files/${e.target.files?.[0]?.name}`,
                                e.target.files?.[0]
                              )
                            }
                          />
                        </td>
                        <td className="table_row">
                          <button
                            className="d-flex align-items-center delete-link p-1 border-0"
                            onClick={() => handleDeleteRow(item.id)}
                            onKeyDown={(e) => handleTabPress(e, item.id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: 'red', fontSize: 15 }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {tableData.map((item: any, index: any) => (
          <Modal size="xl" key={index} show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Triggered by Key Press</Modal.Title>
            </Modal.Header>
            <ModalMaster
              handleModalFieldChange={handleModalFieldChange}
              handleAddRow={handleAddRow}
              materialWeight={materialWeight}
              setMaterialWeight={setMaterialWeight}
              materialListData={materialListData}
              calculateRowValue={calculateRowValue}
              handleDeleteChildTableRow={handleDeleteChildTableRow}
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSaveModal(item.id)}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        ))}
      </div>
    </div>
  );
};

export default MangalsutraReadyReceiptsMaster;
