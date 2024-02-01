import getBarcodeDetailsApi from '@/services/api/Barcode/barcode-details-by-item-code-api';
import getSearchBarcodeItemCodeDetails from '@/services/api/Barcode/search-barcode-itemcode-details-api';
import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import getKunCsOtCategoryApi from '@/services/api/Master/get-kunCsOtCategory-api';
import getKarigarApi from '@/services/api/PurchaseReceipt/get-karigar-list-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useBarcodeListingHook from './barcode-listing-hook';

const UseBarcodeFilterList = () => {
  const { BarcodeListData }: any = useBarcodeListingHook();
  const loginAcessToken = useSelector(get_access_token);
  const [karigarList, setKarigarList] = useState<any>();
  const [kunCsOtCategoryData, setKunCsOtCategoryData] = useState<any>();
  const [BBcategoryData, setBBCategoryData] = useState<any>();
  const [searchKarigar, setSearchKarigar] = useState<any>();
  const [selectDropDownReset, setSelectDropDownReset] =
    useState<boolean>(false);
  const [showCategorySection, setShowCategorySection] =
    useState<boolean>(false);
  const [showBarcodeTableSection, setShowBarcodeTableSection] =
    useState<boolean>(false);
  const [itemCodeDataToShow, setItemCodeDataToShow] = useState<any>([]);
  const [checkedItems, setCheckedItems] = useState<any>([]);

  const [searchBarcodeFilterData, setSearchBarcodeFilterData] = useState<any>({
    date: '',
    // karigar: "",
    item_group: '',
    sr_no_from: '',
    sr_no_to: '',
    stock: '',
    barcode_created: '',
  });
  const [selectedCategory, setSeletedCategory] = useState<any>({
    KunCategory: '',
    CsCategory: '',
    BBCategory: '',
    OtCategory: '',
  });

  useEffect(() => {
    const getStateData: any = async () => {
      const karigarData: any = await getKarigarApi(loginAcessToken.token);
      const kunCsOtData: any = await getKunCsOtCategoryApi(
        loginAcessToken.token
      );
      const BBData: any = await getBBCategoryApi(loginAcessToken.token);
      setKarigarList(karigarData);
      if (kunCsOtData?.data?.message?.status === 'success') {
        setKunCsOtCategoryData(kunCsOtData?.data?.message?.data);
      }
      if (BBData?.data?.message?.status === 'success') {
        setBBCategoryData(BBData?.data?.message?.data);
      }
    };
    getStateData();
  }, []);
  console.log('@barcode karigar data', karigarList);

  const handleSearchBarcodeItemCodeDetails = (e: any, fieldName: any) => {
    let value = e.target.value;
    if (fieldName === 'date') {
      const dateObj = new Date(value);
      const formattedDate = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
      }/${dateObj.getFullYear()}`;
      value = formattedDate;
    }
    setSearchBarcodeFilterData((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSearchBtn: any = async () => {
    let searchBarcodeItemCodeDetailsApi: any =
      await getSearchBarcodeItemCodeDetails(
        searchBarcodeFilterData,
        searchKarigar,
        loginAcessToken?.token
      );
    console.log(
      'searchBarcodeItemCodeDetailsApi res',
      searchBarcodeItemCodeDetailsApi
    );
    if (searchBarcodeItemCodeDetailsApi?.data?.message?.status === 'success') {
      setItemCodeDataToShow(
        searchBarcodeItemCodeDetailsApi?.data?.message?.data
      );
    }
    setShowCategorySection(true);
  };

  console.log(
    'updated searchBarcode filter data',
    searchBarcodeFilterData,
    itemCodeDataToShow
  );

  const handleGenerateBarcodeListBtn: any = async () => {
    setShowBarcodeTableSection(true);
    const reqParams: any = {
      version: 'v1',
      method: 'get_item_specific_barcode',
      entity: 'barcode_api',
      name: checkedItems.map((items: any) => items.name),
    };
    let getBarcodeDetails: any = await getBarcodeDetailsApi(
      loginAcessToken?.token,
      reqParams
    );
    console.log('getBarcodeDetailsApi res', getBarcodeDetails);
  };

  const handleCheckboxChange = (id: any, name: any) => {
    console.log('prev items check', id);

    setCheckedItems((prevItems: any) => {
      console.log('prev items', prevItems);
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

  console.log('checked items', checkedItems);

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    const selectedArray =
      name === 'BBCategory' ? BBcategoryData : kunCsOtCategoryData;
    const selectedObj = selectedArray?.find((obj: any) => obj.name1 === value);

    setSeletedCategory((prevState: any) => ({
      ...prevState,
      [name]: selectedObj,
    }));
    // setStateForDocStatus(true);
  };

  console.log('@barcode selected Category', selectedCategory);
  return {
    karigarList,
    searchKarigar,
    setSearchKarigar,
    selectDropDownReset,
    setSelectDropDownReset,
    handleSearchBarcodeItemCodeDetails,
    handleSearchBtn,
    itemCodeDataToShow,
    showCategorySection,
    handleGenerateBarcodeListBtn,
    showBarcodeTableSection,
    handleCheckboxChange,
    checkedItems,
    kunCsOtCategoryData,
    BBcategoryData,
    selectedCategory,
    setSeletedCategory,
    handleSelectChange,
    BarcodeListData,
  };
};
export default UseBarcodeFilterList;
