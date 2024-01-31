
import getSearchBarcodeItemCodeDetails from '@/services/api/Barcode/search-barcode-itemcode-details-api';
import getKarigarApi from '@/services/api/PurchaseReceipt/get-karigar-list-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UseBarcodeFilterList = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [karigarList, setKarigarList] = useState<any>();
  const [searchKarigar, setSearchKarigar] = useState<any>();
  const [selectDropDownReset, setSelectDropDownReset] = useState<boolean>(false);
  const [showCategorySection, setShowCategorySection] = useState<boolean>(false);
  const [showBarcodeTableSection, setShowBarcodeTableSection] = useState<boolean>(false);
  const [itemCodeDataToShow, setItemCodeDataToShow] = useState<any>([]);
  const [checkedItems, setCheckedItems] = useState<any>([]);

  const [searchBarcodeFilterData, setSearchBarcodeFilterData] = useState<any>({
    date: "",
    // karigar: "",
    item_group: "",
    sr_no_from: "",
    sr_no_to: "",
    stock: "",
    barcode_created: ""
  });

  useEffect(() => {
    const getStateData: any = async () => {
      const karigarData: any = await getKarigarApi(loginAcessToken.token);
      setKarigarList(karigarData);
    };
    getStateData();
  }, []);
  console.log('@barcode karigar data', karigarList);

  const handleSearchBarcodeItemCodeDetails = (e: any, fieldName: any) => {
    let value = e.target.value;
    if (fieldName === "date") {
      const dateObj = new Date(value);
      const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
      value = formattedDate;
    }
    setSearchBarcodeFilterData((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  };


  const handleSearchBtn: any = async () => {
    let searchBarcodeItemCodeDetailsApi: any = await getSearchBarcodeItemCodeDetails(searchBarcodeFilterData, searchKarigar, loginAcessToken?.token)
    console.log("searchBarcodeItemCodeDetailsApi res", searchBarcodeItemCodeDetailsApi)
    if (searchBarcodeItemCodeDetailsApi?.data?.message?.status === "success") {
      setItemCodeDataToShow(searchBarcodeItemCodeDetailsApi?.data?.message?.data)

    }
    setShowCategorySection(true)
  }

  console.log("updated searchBarcode filter data", searchBarcodeFilterData, itemCodeDataToShow)

  const handleGenerateBarcodeListBtn: any = () => {
    setShowBarcodeTableSection(true)
  };

  const handleCheckboxChange = (id: any, name: any) => {
    console.log("prev items check", id)

    setCheckedItems((prevItems: any) => {
      console.log("prev items", prevItems)
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

  console.log("checked items", checkedItems)
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
    checkedItems
  };
};
export default UseBarcodeFilterList;
