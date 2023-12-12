import getPurchasreceiptListApi from '@/services/api/get-purchase-recipts-list-api';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { get_access_token } from '@/store/slices/auth/login-slice';
import getKarigarApi from '@/services/api/get-karigar-list-api';
import kundanKarigarApi from '@/services/api/get-kundan-karigar-list-api';
import materialApi from '@/services/api/get-material-list-api';
import postUploadFile from '@/services/api/post-upload-file-api';
import postMaterialApi from '@/services/api/post-material-api';
import purchaseReceiptApi from '@/services/api/post-purchase-receipt-api';
import { toast } from 'react-toastify';

import UseCustomReceiptHook from './custom-receipt-hook';
import UpdatePurchaseReceiptApi from '@/services/api/PurchaseReceipt/update-purchase-receipt-api';
import { getSpecificReceipt } from '@/store/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import AmendPurchaseReceiptApi from '@/services/api/PurchaseReceipt/Amend-purchase-receipt-api';
import { table } from 'console';

const useReadyReceiptKarigar = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router: any = useRouter();
  const pathParts: any = router?.asPath?.split('/');
  const lastPartOfURL: any = pathParts[pathParts?.length - 1];
  console.log('receipt type', lastPartOfURL, query);
  const inputRef = useRef<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [readyReceiptType, setReadyReceiptType] = useState<any>('');

  const [recipitData, setRecipitData] = useState({
    custom_karigar: ' ',
    remarks: '',
    custom_ready_receipt_type: readyReceiptType,
  });
  useEffect(() => {
    setRecipitData({
      ...recipitData,
      custom_ready_receipt_type: readyReceiptType,
    });
  }, [readyReceiptType]);
  console.log('readyreceiptt', readyReceiptType);

  console.log('ready receipt type', readyReceiptType);

  const [clickBtn, setClickBtn] = useState<boolean>(false);
  const [clicks, setClick] = useState<boolean>(false);
  const [karigarData, setKarigarData] = useState<any>();
  const [kundanKarigarData, setKundanKarigarData] = useState<any>();
  const [materialListData, setMaterialListData] = useState<any>();
  const [indexVal, setIndexVal] = useState<any>();
  const [activeModalId, setActiveModalId] = useState<any>(null);
  const [totalWt, setTotalWt] = useState<any>(0);

  const [kunKarigarDropdownReset, setKunKarigarDropdownReset] =
    useState<any>(false);

  const loginAcessToken = useSelector(get_access_token);
  console.log(loginAcessToken, 'loginAcessToken');
  let disabledValue: any;
  const [materialWeight, setMaterialWeight] = useState<any>();
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  const [
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
  ] = useState('');
  // const [stateForDocStatus, setStateForDocStatus] = useState<any>(false);
  console.log('material', materialWeight);
  const initialState: any = {
    idx: 1,
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
        idx: materialWeight === undefined ? 1 : materialWeight?.length,
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
  const [tableData, setTableData] = useState<any>([initialState]);

  const {
    HandleDeleteReceipt,
    setKundanListing,
    kundanListing,
    setShowSaveButtonForAmendFlow,
    showSaveButtonForAmendFlow,
    stateForDocStatus,
    setStateForDocStatus,
    readOnlyFields,
    setReadOnlyFields,
    HandleUpdateDocStatus,
  }: any = UseCustomReceiptHook();

  console.log('table data updated', tableData);

  useEffect(() => {
    const getPurchaseList = async () => {
      const capitalizeFirstLetter = (str: any) => {
        return str?.charAt(0)?.toUpperCase() + str?.slice(1);
      };
      if (Object?.keys(query)?.length > 0) {
        const listData = await getPurchasreceiptListApi(
          loginAcessToken,
          capitalizeFirstLetter(query.receipt)
        );
        console.log('listdataa', listData);
        if (listData?.data?.message?.status === 'success') {
          setKundanListing(listData?.data?.message?.data);
        }
      }
    };
    getPurchaseList();
  }, [clicks, router]);

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
  }, []);
  console.log(materialWeight, 'karigarData');
  const calculateRowValue = (i: any) => {
    console.log(i, 'i');
    return (
      materialWeight[i]?.pcs * materialWeight[i]?.piece_ +
      materialWeight[i]?.carat * materialWeight[i]?.carat_ +
      materialWeight[i]?.weight * materialWeight[i]?.gm_
    );
  };

  const calculateEditTotal = (i: number, value: any) => {
    console.log('calculate edit value', i, value);
    const updatedData =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData.map((item: any) => {
        if (item.idx === i) {
          const totalvalues = item?.table.map((row: any) => row.amount);
          let numbers: any;
          if (Array.isArray(totalvalues) && totalvalues.length === 1) {
            numbers = totalvalues[0];
          } else {
            numbers = totalvalues.reduce((accu: any, val: any) => {
              return accu + val;
            }, 0);
          }
          let totalAmountValues = '';

          if (Array.isArray(totalvalues)) {
            totalAmountValues = totalvalues.reduce((accu: any, val: any) => {
              return accu + val;
            }, 0);
          }
          if (Number(item.totalAmount) >= 0) {
            return {
              ...item,
              custom_other: Number(value),
              custom_total: Number(item.totalAmount) + Number(value),
            };
          } else if (item.totalAmount === undefined) {
            return {
              ...item,
              custom_other: Number(value),
              totalAmount: totalAmountValues,
              custom_total:
                item.totalAmount >= 0
                  ? Number(item.totalAmount) + Number(value)
                  : Number(value),
            };
          } else
            return {
              ...item,
              custom_other: value,
              totalAmount: totalAmountValues,
            };
        }
        console.log(item, 'updated data after edit2');
        return item;
      });
    console.log(updatedData, 'updated data after edit');
    setStateForDocStatus(true);
    setTableData(updatedData);
    console.log(tableData, 'updated data after edit1');
  };
  useEffect(() => {
    // This code will run after the state has been updated
    console.log(tableData, 'updated data after edit1');
  }, [tableData]);

  const handleFieldChange = (
    id: number,
    val: any,
    field: string,
    newValue: any,
    fileVal?: any
  ) => {
    console.log('handlechange', id, val, field, newValue, "fileval", fileVal);
    console.log("handlechange fileval", fileVal);

    const updatedData = tableData?.map((item: any) => {
      if (item.idx === id) {

        let filePath;
        if (fileVal instanceof File) {
          filePath = `/files/${fileVal.name}`;
        } else {
          filePath = fileVal;
        }


        console.log("handlechange updated file data value", filePath)
        return {
          ...item,
          [field]:
            // field === 'custom_add_photo' ? fileData : newValue,
            field === 'custom_add_photo' ? filePath : newValue,
        };
      }
      return item;
    });

    console.log(updatedData, 'bbb');

    setTableData(updatedData);
    if (field === 'custom_add_photo') {
      console.log(fileVal, 'fileVal');
      handleFileUpload(id, fileVal);
    }

    setStateForDocStatus(true);
  };


  const handleFileUpload = async (id: number, fileVal: any) => {
    console.log("fileval in upload", fileVal)
    const updatedData = await Promise.all(
      tableData?.map(async (row: any) => {
        if (row.idx === id) {
          const uploadedFile = await postUploadFile(
            loginAcessToken.token,
            fileVal
          );

          console.log('upload file path', uploadedFile);
          return {
            ...row,
            custom_add_photo: `/files/${uploadedFile?.file_name}`,
          };
        }
        return row;
      }) || []
    );

    setTableData(updatedData);
    setStateForDocStatus(true);
  };

  const handleClearFileUploadInput: any = (id: any) => {
    console.log("clear file uplaod", id, tableData)

    setTableData((prevList: any) =>
      prevList.map((item: any) =>
        item.idx === id ? { ...item, custom_add_photo: '' } : item
      )
    );


  }


  const handleModalFieldChange = (
    id: number,
    val: any,
    field: string,
    newValue: any
  ) => {
    console.log('field change data', id, val, field, newValue);
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, i: any) => {
        if (i === id) {
          return { ...item, [field]: 0 || newValue };
        }
        return item;
      });

    // const newVal =
    //   tableData?.length > 0 &&
    //   tableData !== null &&
    //   tableData?.table?.filter(
    //     (item: any) => materialListData?.includes(item.material_name)
    //   );
    // console.log(newVal, 'newVal');
    console.log(updatedModalData, 'updatedModalData');
    setMaterialWeight(updatedModalData);
    setStateForDocStatus(true);
  };
  const handleAddRow = (value: any) => {
    const newRow = {
      idx: tableData?.length + 1,
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
          idx: materialWeight !== undefined ? materialWeight?.length + 1 : 1,
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
    setStateForDocStatus(true);
  };
  const handleTabPress = (event: any, id: any) => {
    if (event.key === 'Tab' && id === tableData[tableData.length - 1].idx) {
      handleAddRow('tableRow');
    }
    setStateForDocStatus(true);
  };
  const handleTabPressOnModal = (event: any, id: any) => {
    if (event.key === 'Tab') {
      handleAddRow('modalRow');
    }
    setStateForDocStatus(true);
  };

  const handleModal = (event: any, id: any, data: any) => {
    setIndexVal(id);
    const dataVal =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.filter((item: any) => {
        if (item.idx === id && event.key === 'F2') {
          setShowModal(true);
          // if (item.totalAmount > 0) {
          setMaterialWeight(item.table);
          // } else {
          // setMaterialWeight(data.table);
          // }
        }
      });
    setStateForDocStatus(true);
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
      let weight = val.weight;
      if (val.weight === '') {
        weight = 0;
      }
      const total = Number(accu) + Number(weight);
      return total;
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
    const updatedMaterialWeight =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.map((row: any, i: any) => {
        if (row.idx === indexVal) {
          const numbersParsed = parseInt(numbers, 10);
          return {
            ...row,
            totalModalWeight: weightAddition,
            totalAmount: totalAmmountValues,
            table: materialWeight.map(({ id, ...rest }: any) => ({ ...rest })),
            custom_mat_wt: weightAddition,
            custom_gross_wt:
              Number(row.custom_net_wt) +
              Number(row.custom_few_wt) +
              Number(weightAddition),
            custom_total: numbersParsed,
          };
        }
        return row;
      });

    const updatedDataVal = updatedMaterialWeight.map((row: any, i: any) => {
      if (row.idx === indexVal) {
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
      data: modalValue,
    };
    console.log(updatedMaterialWeight, 'data45');
    const materialApiVal = await postMaterialApi(loginAcessToken.token, values);
    setShowModal(false);
    setStateForDocStatus(true);
  };

  const handleDeleteRow = (id: any) => {
    if (tableData?.length > 1) {
      const updatedData =
        tableData?.length > 0 &&
        tableData !== null &&
        tableData
          .filter((item: any) => item.idx !== id)
          .map((row: any, index: number) => ({ ...row, id: index + 1 }));
      setTableData(updatedData);
    }
    setStateForDocStatus(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveModalId(null);
  };

  const handleRecipietChange = (e: any) => {
    setRecipitData({ ...recipitData, [e.target.name]: e.target.value });
    setStateForDocStatus(true);
  };
  console.log(recipitData, 'recipitData');

  const handleCreate = async () => {
    console.log(tableData, 'table56', recipitData);
    const updatedtableData =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.map((row: any, i: any) => {
        if (row.idx === indexVal) {
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

    const isEmptyProductCode = values?.items?.some(
      (obj: any) => obj.product_code === ''
    );
    const isEmptyMaterial = values?.items?.some((obj: any) =>
      obj.table.some((vals: any) => vals.material === '')
    );
    const productVal = values.custom_karigar;
    console.log(isEmptyMaterial, 'finalVal');
    if (isEmptyProductCode || productVal === '') {
      toast.error('Mandatory fields Item code Or Karigar');
    } else {
      const purchaseReceipt: any = await purchaseReceiptApi(
        loginAcessToken.token,
        values
      );
      console.log(purchaseReceipt?.data?.message?.message, 'handleCreate');
      if (
        purchaseReceipt.status === 200 &&
        purchaseReceipt?.data?.hasOwnProperty('message')
      ) {
        router.push(
          `${readyReceiptType}/${purchaseReceipt?.data?.message?.message}`
        );

        toast.success('Purchase Receipt Created Sucessfully');
      } else {
        toast.error('Error in Creating Purchase Receipt');
      }
    }
  };

  const HandleEmptyReadyReceiptForm: any = () => {
    setRecipitData({
      custom_karigar: ' ',
      remarks: '',
      custom_ready_receipt_type: readyReceiptType,
    });
    setTableData([initialState]);
    setSelectedDropdownValue('');
    setSelectedKundanKarigarDropdownValue('');
    setKunKarigarDropdownReset(true);
  };
  console.log(tableData, 'tabledata update');
  const handleUpdateReceipt: any = async () => {
    console.log('update receipt', tableData);
    const updatedtableData =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.map((row: any, i: any) => {
        if (row.idx === indexVal) {
          if (
            row.custom_other !== '' &&
            row.custom_total !== '' &&
            row.custom_other !== 0
          ) {
            return {
              ...row,
              custom_total: Number(row.totalAmount) + Number(row.custom_other),
            };
          }
          // else if (row.custom_other !== '') {
          //   return {
          //     ...row,
          //     custom_total: Number(row.custom_other) + Number(row.totalAmount),
          //   };
          // }
          else if (row.totalAmount === undefined && row.custom_other === 0) {
            return {
              ...row,
              custom_total: Number(row.custom_total),
            };
          } else {
            return {
              ...row,
              custom_total: Number(row.totalAmount),
            };
          }
        }
        return row;
      });
    console.log(updatedtableData, 'updated data after save');
    const updatedMergedList = updatedtableData.map((obj: any) => ({
      ...obj,
      custom_purchase_receipt_item_breakup: '',
      item_group: 'All Item Groups',
    }));
    console.log(updatedMergedList, 'updatedtableData');
    const values = {
      ...recipitData,
      items: updatedMergedList,
    };
    console.log(values, 'updatedMergedList values');
    let updateReceiptApi: any = await UpdatePurchaseReceiptApi(
      loginAcessToken.token,
      values,
      query?.receiptId
    );
    console.log('updated purchase receipt api res', updateReceiptApi);
    if (Object?.keys(updateReceiptApi?.data)?.length > 0) {
      if (Object?.keys(updateReceiptApi?.data?.message)?.length > 0) {
        setStateForDocStatus(false);
        const params: any = {
          token: loginAcessToken?.token,
          name: query?.receiptId,
        };
        dispatch(getSpecificReceipt(params));
      }
    }
    // if (updateReceiptApi?.data?.message?.status === 'success') {
    //   setStateForDocStatus(false);
    //   const params: any = {
    //     token: loginAcessToken?.token,
    //     name: query?.receiptId,
    //   };
    //   dispatch(getSpecificReceipt(params));
    // }
  };

  const HandleAmendButtonForDuplicateChitti: any = async () => {
    console.log('tabledata in amend', tableData);
    const updatedtableData =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.map((row: any, i: any) => {
        if (row.idx === indexVal) {
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

    // Change key name from 'product_code' to 'item_code' in the tableData
    const updatedTableDataWithRenamedKey = updatedtableData?.map((row: any) => {
      return {
        ...row,
        item_code: row.product_code,
      };
    });

    // List of keys to be excluded from the API request
    const keyToExclude = ['docstatus'];

    const updatedReceiptData: any = { ...recipitData };
    keyToExclude?.forEach((key: any) => delete updatedReceiptData[key]);
    console.log('santitizedData', updatedReceiptData);

    const values = {
      ...updatedReceiptData,
      amended_from: lastPartOfURL,
      items: updatedTableDataWithRenamedKey,
    };
    try {
      let amendReceiptApi: any = await AmendPurchaseReceiptApi(
        loginAcessToken.token,
        values,
        query?.receiptId
      );

      console.log(
        'updated purchase receipt api res',
        amendReceiptApi,
        readyReceiptType
      );

      if (amendReceiptApi?.data?.hasOwnProperty('data')) {
        const newURL = `/readyReceipt/${readyReceiptType}/${amendReceiptApi?.data?.data?.name}`;
        const asPath = `/readyReceipt/${readyReceiptType}/${amendReceiptApi?.data?.data?.name}`;

        // Update the URL with the required query parameter
        router.push(newURL, asPath);
        setStateForDocStatus(false);
        setShowSaveButtonForAmendFlow(false);
      } else {
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  const handleDeleteChildTableRow = (id: any) => {
    if (materialWeight?.length > 1) {
      const updatedData = materialWeight?.filter(
        (item: any, i: any) => i !== id
      );
      setMaterialWeight(updatedData);
    }
    setStateForDocStatus(true);
  };

  console.log(tableData, 'table data kundanlisting');
  console.log('modal state', showModal);
  const [isModalOpen, setModalOpen] = useState(false);
  const HandlePhotoUploadModal = (event: any, id: number, item: any) => {
    const dataVal =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.filter((item: any) => {
        if (item.idx === id) {
          setModalOpen(true);
        }
      });
  };

  const openPhotoModal = () => {
    setModalOpen(true);
  };

  const closePhotoModal = () => {
    setModalOpen(false);
  };

  const handleCameraOption = () => {
    // Implement camera option (you may need to use a third-party library or native API)
    console.log('Camera option selected');
    closeModal();
  };
  return {
    setClick,
    kundanListing,
    handleCreate,
    handleRecipietChange,
    handleAddRow,
    recipitData,
    karigarData,
    setRecipitData,
    handleFieldChange,
    tableData,
    handleDeleteRow,
    handleTabPress,
    setTableData,
    kundanKarigarData,
    handleModal,
    handleModalFieldChange,
    materialWeight,
    materialListData,
    calculateRowValue,
    handleDeleteChildTableRow,
    setMaterialWeight,
    closeModal,
    handleSaveModal,
    showModal,
    lastPartOfURL,
    HandleDeleteReceipt,
    selectedDropdownValue,
    setSelectedDropdownValue,
    readyReceiptType,
    setReadyReceiptType,
    stateForDocStatus,
    setStateForDocStatus,
    indexVal,
    handleUpdateReceipt,
    readOnlyFields,
    setReadOnlyFields,
    setShowSaveButtonForAmendFlow,
    showSaveButtonForAmendFlow,
    HandleUpdateDocStatus,
    setKundanListing,
    HandleAmendButtonForDuplicateChitti,
    handleTabPressOnModal,
    HandleEmptyReadyReceiptForm,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    kunKarigarDropdownReset,
    setKunKarigarDropdownReset,
    calculateEditTotal,
    HandlePhotoUploadModal,
    handleClearFileUploadInput
  };
};

export default useReadyReceiptKarigar;
