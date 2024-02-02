import getBarcodeListingApi from '@/services/api/Barcode/get-barcode-listing-api';
import PrintApi from '@/services/api/general/print-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useBarcodeListingHook = () => {

  const loginAcessToken = useSelector(get_access_token);
  const [BarcodeListData, setBarcodeListData] = useState<any>();
  const [multipleRecordsForPrint, setMultipleRecordsForPrint] = useState<any>([]);
  useEffect(() => {
    const getStateData: any = async () => {
      const BarcodeData: any = await getBarcodeListingApi(
        loginAcessToken.token
      );
      if (BarcodeData?.data?.message?.status === 'success') {
        setBarcodeListData(BarcodeData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);



  const handleBarcodePrint: any = async (item_code: any) => {
    console.log("handle multiple print", multipleRecordsForPrint)
    const reqParams: any = {
      version: "v1",
      method: "print_barcode",
      entity: "barcode",
      name: item_code
    }

    let barcodePrintApi: any = await PrintApi(reqParams)
    console.log("barcodeprint api res", barcodePrintApi)
    if (barcodePrintApi?.status === "success") {
      window.open(barcodePrintApi?.data?.data[0]?.print_url)
    } else if (barcodePrintApi?.status === "error") {
      toast.error(barcodePrintApi?.message)
    }
  }

  const handleMultipleBarcodePrint: any = () => {
    console.log("handle multiple print", multipleRecordsForPrint)
  }

  console.log("updated multiple record", multipleRecordsForPrint)

  const handleCheckboxForBarcodePrint = (id: any, name: any) => {
    console.log('prev items check', id, name);

    setMultipleRecordsForPrint((prevItems: any) => {
      const index = prevItems.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        // If checkbox is already checked, remove it from the list
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      } else {
        // If checkbox is not checked, add it to the list
        return [...prevItems, { id, name }];
      }
    });
  };

  console.log(BarcodeListData, '@Barcode list data');
  return {
    BarcodeListData,
    handleCheckboxForBarcodePrint,
    multipleRecordsForPrint,
    handleBarcodePrint,
    handleMultipleBarcodePrint,

  };
};
export default useBarcodeListingHook;
