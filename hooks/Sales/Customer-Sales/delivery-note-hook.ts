import { useState } from 'react';
import UseCustomerSaleHook from './customer-sale-hook';

const UseDeliveryNoteHook = () => {
  const { selectedCategory, salesTableData }: any = UseCustomerSaleHook();
  const [deliveryNoteData, setDeliveryNoteData] = useState({
    Client: '',
  });
  console.log(salesTableData, 'salesTable in delivery note');
  const [selectedClient, setSelectedClient] = useState('');
  const handleDNClientChange = () => {
    setDeliveryNoteData({ ...deliveryNoteData, Client: selectedClient });
    const handleDNCreate: any = () => {
      const values = {
        ...deliveryNoteData,
        Client: selectedClient,
        version: 'v1',
        method: 'create_delivery_note',
        entity: 'delivery_note_api',
        custom_kun_category: selectedCategory?.KunCategory?.name1,
        custom_cs_category: selectedCategory?.CsCategory?.name1,
        custom_bb_category: selectedCategory?.BBCategory?.name1,
        custom_ot_category: selectedCategory?.OtCategory?.name1,
        items: salesTableData,
      };
    };
  };
  return {
    deliveryNoteData,
    setDeliveryNoteData,
    selectedClient,
    setSelectedClient,
  };
};
export default UseDeliveryNoteHook;
