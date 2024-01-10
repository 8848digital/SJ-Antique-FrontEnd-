import getDeliveryNoteListing from '@/services/api/Sales/get-delivery-note-listing-api';
import DeleteApi from '@/services/api/general/delete-api';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UseSalesReturnDetailHook = () => {
  const loginAcessToken = useSelector(get_access_token);
  const [saleReturnDeliveryNoteListing, setSaleReturnDeliveryNoteListing] =
    useState();
  console.log('inside dn hook');
  const deliveryNoteListParams = {
    version: 'v1',
    method: 'get_listening_delivery_note_sales_return',
    entity: 'delivery_note_api',
  };
  useEffect(() => {
    const getKunCsOTCategoryData = async () => {
      const deliveryNoteApi: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      if (deliveryNoteApi?.data?.message?.status === 'success') {
        setSaleReturnDeliveryNoteListing(deliveryNoteApi?.data?.message?.data);
      }
    };

    getKunCsOTCategoryData();
  }, []);
  const HandleDeleteDeliveryNote: any = async (name: any) => {
    const version = 'v1';
    const method = 'delete_delivery_note_api';
    const entity = 'delivery_note_api';

    let deleteApi: any = await DeleteApi(
      loginAcessToken?.token,
      version,
      method,
      entity,
      name
    );

    if (deleteApi?.message?.status === 'success') {
      toast.success('Sales note Deleted');

      let updatedData: any = await getDeliveryNoteListing(
        loginAcessToken.token,
        deliveryNoteListParams
      );
      console.log('resss', updatedData?.data?.message?.data);
      if (updatedData?.data?.message?.status === 'success') {
        setSaleReturnDeliveryNoteListing(updatedData?.data?.message?.data);
        console.log(saleReturnDeliveryNoteListing, 'delivery note listing');
      }
    } else {
      toast.error('Failed to delete Sales note');
    }
  };

  return { saleReturnDeliveryNoteListing, HandleDeleteDeliveryNote };
};

export default UseSalesReturnDetailHook;
