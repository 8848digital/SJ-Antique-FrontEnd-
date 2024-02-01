import getBarcodeListingApi from '@/services/api/Barcode/get-barcode-listing-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useBarcodeListingHook = () => {
  // access token
  const loginAcessToken = useSelector(get_access_token);
  const [BarcodeListData, setBarcodeListData] = useState<any>();
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
  console.log(BarcodeListData, '@Barcode list data');
  return {
    BarcodeListData,
  };
};
export default useBarcodeListingHook;
