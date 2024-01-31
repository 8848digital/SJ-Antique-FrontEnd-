import getKarigarApi from '@/services/api/PurchaseReceipt/get-karigar-list-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UseBarcodeFilterList = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [karigarList, setKarigarList] = useState();
  const [searchKarigar, setSearchKarigar] = useState();
  const [selectDropDownReset, setSelectDropDownReset] = useState(false);
  useEffect(() => {
    const getStateData: any = async () => {
      const karigarData: any = await getKarigarApi(loginAcessToken.token);

      setKarigarList(karigarData);
    };
    getStateData();
  }, []);
  console.log('@barcode karigar data', karigarList);
  return {
    karigarList,
    searchKarigar,
    setSearchKarigar,
    selectDropDownReset,
    setSelectDropDownReset,
  };
};
export default UseBarcodeFilterList;
