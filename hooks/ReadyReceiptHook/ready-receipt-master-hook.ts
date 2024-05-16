import AmendPurchaseReceiptApi from '@/services/api/PurchaseReceipt/Amend-purchase-receipt-api';
import getKarigarApi from '@/services/api/PurchaseReceipt/get-karigar-list-api';
import kundanKarigarApi from '@/services/api/PurchaseReceipt/get-kundan-karigar-list-api';
import materialApi from '@/services/api/PurchaseReceipt/get-material-list-api';
import getPurchasreceiptListApi from '@/services/api/PurchaseReceipt/get-purchase-recipts-list-api';
import getWarehouseListApi from '@/services/api/PurchaseReceipt/get-warehouse-list';
import purchaseReceiptApi from '@/services/api/PurchaseReceipt/post-purchase-receipt-api';
import UpdatePurchaseReceiptApi from '@/services/api/PurchaseReceipt/update-purchase-receipt-api';
import { getSpecificReceipt } from '@/store/slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useCustomReadyReceiptHook from './ready-receipt-custom-hook';
import useReadyReceiptCustomCalculationHook from './ready-receipt-custom-calculation-hook';

const useReadyReceipt = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router: any = useRouter();
  const pathParts: any = router?.asPath?.split('/');
  const lastPartOfURL: any = pathParts[pathParts?.length - 1];
  const inputRef = useRef<any>(null);
  const lastInputRef = useRef<any>(null);
  const firstInputRef = useRef<any>(null);
  const [readyReceiptType, setReadyReceiptType] = useState<any>('');
  const [recipitData, setRecipitData] = useState<any>({
    custom_karigar: ' ',
    remarks: '',
    custom_ready_receipt_type: readyReceiptType,
    posting_date: '',
    store_location: '',
  });

  const [karigarData, setKarigarData] = useState<any>();
  const [kundanKarigarData, setKundanKarigarData] = useState<any>();
  const [materialListData, setMaterialListData] = useState<any>();
  const [warehouseListData, setWarehouseListData] = useState<any>();
  const [kunKarigarDropdownReset, setKunKarigarDropdownReset] =
    useState<any>(false);
  const loginAcessToken = useSelector(get_access_token);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  const [selectedLocation, setSelectedLocation] = useState<any>();
  let disabledValue: any;
  useEffect(() => {
    setRecipitData({
      ...recipitData,
      custom_ready_receipt_type: readyReceiptType,
      store_location:
        selectedLocation !== '' && selectedLocation !== undefined
          ? selectedLocation
          : 'Mumbai',
    });
  }, [readyReceiptType, selectedLocation]);

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
    tableData,
    setTableData,
    materialWeight,
    setMaterialWeight,
    handleClearFileUploadInput,
    calculateEditTotal,
    handleDeleteRow,
    handleDeleteChildTableRow,
    calculateRowValue,
    handleModal,
    indexVal,
    showModal,
    setShowModal,
    handleFieldChange,
    purchasRecieptListParams,
    initialTableState,
    handleAddRow,
    setMatWt,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    specificDataFromStore,
    handleModalFieldChange,
  }: any = useCustomReadyReceiptHook();

  const {
    calculateWtForCreateReceipt,
    calculateTableDataForUpdateReceipt,
    calculateTableDataForAmendReceipt,
    filteredTableDataForUpdate,
    calculateReadyReceiptModalData,
  }: any = useReadyReceiptCustomCalculationHook();

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

        if (listData?.data?.message?.status === 'success') {
          setKundanListing(listData?.data?.message?.data);
        }
      }
    };
    getPurchaseList();
  }, [router]);

  useEffect(() => {
    const getStateData: any = async () => {
      const karigarData: any = await getKarigarApi(loginAcessToken.token);
      const kundanKarigarData: any = await kundanKarigarApi(
        loginAcessToken.token
      );
      const materialListData: any = await materialApi(loginAcessToken.token);
      const warehouseData = await getWarehouseListApi(loginAcessToken?.token);

      if (karigarData?.data?.message?.status === 'success') {
        setKarigarData(karigarData?.data?.message?.data);
      }
      if (kundanKarigarData?.data?.message?.status === 'success') {
        setKundanKarigarData(kundanKarigarData?.data?.message?.data);
      }
      if (materialListData?.data?.message?.status === 'success') {
        setMaterialListData(materialListData?.data?.message?.data);
      }

      if (warehouseData?.data?.message?.status === 'success') {
        setWarehouseListData(warehouseData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);

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

    if (inputRef?.current) {
      disabledValue = inputRef.current.value;
    } else {
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

    const { updatedDataVal }: any = calculateReadyReceiptModalData({
      materialWeight,
      tableData,
      indexVal,
    });

    setTableData(updatedDataVal);
    setShowModal(false);
    setStateForDocStatus(true);
    setMatWt('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRecipietChange = (e: any) => {
    setRecipitData({ ...recipitData, [e.target.name]: e.target.value });
    setStateForDocStatus(true);
  };

  const handleTabPressOnModal = (event: any, id: any) => {
    if (event.key === 'Tab') {
      handleAddRow('modalRow');
    }
    setStateForDocStatus(true);
  };

  const handleTabPress = (event: any, id: any, keyValue: any) => {
    if (event.key === 'Tab' && id === tableData[tableData.length - 1].idx) {
      handleAddRow('tableRow');
    }
    setStateForDocStatus(true);
    firstInputRef?.current?.focus();
  };

  const handleCreate = async () => {
    const updatedTableData: any = calculateWtForCreateReceipt({
      tableData,
      indexVal,
    });
    const modalValue: any = updatedTableData?.map(
      ({ id, totalModalWeight, totalAmount, totalModalPcs, ...rest }: any) => {
        if (!rest.hasOwnProperty('custom_kun_karigar')) {
          return { ...rest, custom_kun_karigar: 'default_value' };
        }
        return rest;
      }
    );
    const values = {
      version: 'v1',
      method: 'create_purchase_receipt',
      entity: 'purchase_receipt',
      ...recipitData,
      items: modalValue,
    };

    const isEmptyProductCode = values?.items?.some(
      (obj: any) => obj.product_code === ''
    );
    const isEmptyNetWt = values?.items?.some(
      (obj: any) => obj.custom_net_wt === 0
    );
    const productVal = values.custom_karigar;

    if (isEmptyProductCode) {
      toast.error('Please fill all the required fields');
    } else if (isEmptyNetWt) {
      toast.error('Please fill all the required fields');
    } else if (productVal === ' ') {
      toast.error('Mandatory field Karigar');
    } else {
      const purchaseReceipt: any = await purchaseReceiptApi(
        loginAcessToken.token,
        values
      );
      // console.log('purchase receipt api res', purchaseReceipt);
      if (purchaseReceipt?.data?.message?.status === "error") {
        toast.error(`${purchaseReceipt?.data?.message?.message}`);
      } else {
        router.push(
          `${readyReceiptType?.toLowerCase()}/${purchaseReceipt?.data?.message
            ?.message}`
        );
        toast.success('Purchase Receipt Created Successfully');
      }

    }
  };

  const HandleEmptyReadyReceiptForm: any = () => {
    setRecipitData({
      custom_karigar: ' ',
      remarks: '',
      custom_ready_receipt_type: readyReceiptType,
      posting_date: '',
      store_location: 'Mumbai',
    });
    setTableData([initialTableState]);
    setSelectedDropdownValue('');
    setSelectedKundanKarigarDropdownValue('');
    setKunKarigarDropdownReset(true);
  };

  const handleUpdateReceipt: any = async () => {
    const filteredDataa = filteredTableDataForUpdate(tableData);
    const updatedTableData: any = calculateTableDataForUpdateReceipt({
      filteredDataa,
      indexVal,
    });

    const updatedMergedList = updatedTableData.map((obj: any) => ({
      ...obj,
      custom_purchase_receipt_item_breakup: '',
      item_group: 'All Item Groups',
    }));

    const values = {
      version: 'v1',
      method: 'put_purchase_receipt',
      entity: 'purchase_receipt',
      ...recipitData,
      items: updatedMergedList,
    };

    const keyToExclude = ['posting_date'];

    const updatedReceiptData: any = { ...values };
    keyToExclude?.forEach((key: any) => delete updatedReceiptData[key]);

    let updateReceiptApi: any = await UpdatePurchaseReceiptApi(
      loginAcessToken.token,
      updatedReceiptData,
      query?.receiptId
    );

    if (updateReceiptApi?.data?.hasOwnProperty('message')) {
      if (updateReceiptApi?.data?.message?.hasOwnProperty('name')) {
        setStateForDocStatus(false);
        const params: any = {
          token: loginAcessToken?.token,
          name: query?.receiptId,
        };
        dispatch(getSpecificReceipt(params));
      } else {
        toast.error(`${updateReceiptApi?.data?.message?.error}`);
      }
    }
  };

  const handleAmendButtonForDuplicateChitti: any = async () => {
    const updatedTableData: any = calculateTableDataForAmendReceipt({
      tableData,
      indexVal,
    });
    // Change key name from 'product_code' to 'item_code' in the tableData
    const updatedTableDataWithRenamedKey = updatedTableData?.map((row: any) => {
      return {
        ...row,
        item_code: row.product_code,
      };
    });

    // List of keys to be excluded from the API request
    const keyToExclude = ['docstatus'];

    const updatedReceiptData: any = { ...recipitData };
    keyToExclude?.forEach((key: any) => delete updatedReceiptData[key]);

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

      console.log("amend api res",amendReceiptApi)

      if (amendReceiptApi?.data?.hasOwnProperty('data')) {
        const newURL = `/readyReceipt/${readyReceiptType}/${amendReceiptApi?.data?.data?.name}`;
        const asPath = `/readyReceipt/${readyReceiptType}/${amendReceiptApi?.data?.data?.name}`;

        // Update the URL with the required query parameter
        router.push(newURL, asPath);
        setStateForDocStatus(false);
        setShowSaveButtonForAmendFlow(false);
      } else {
      }
    } catch (error) { }
  };

  return {
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
    handleAmendButtonForDuplicateChitti,
    handleTabPressOnModal,
    HandleEmptyReadyReceiptForm,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    kunKarigarDropdownReset,
    setKunKarigarDropdownReset,
    calculateEditTotal,
    handleClearFileUploadInput,
    purchasRecieptListParams,
    lastInputRef,
    firstInputRef,
    setMatWt,
    warehouseListData,
    selectedLocation,
    setSelectedLocation,
    specificDataFromStore,
  };
};

export default useReadyReceipt;
