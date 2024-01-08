import { combineReducers } from '@reduxjs/toolkit';
import GetAccessTokenScreen from '../store/slices/auth/login-slice';
import GetSpecificReceiptDataReducer from '../store/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import GetDetailOfDeliveryNoteDataReducer from '../store/slices/Sales/getDetailOfDeliveryNoteApi';
import GetClientGroupDataReducer from '../store/slices/Master/get-client-group-slice';
const appReducer = combineReducers({
  GetAccessTokenScreen: GetAccessTokenScreen,
  GetSpecificReceiptDataScreen: GetSpecificReceiptDataReducer,
  GetDetailOfDeliveryNoteDataScreen: GetDetailOfDeliveryNoteDataReducer,
  GetClientGroupDataScreen: GetClientGroupDataReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'Login/LogoutSuccess') {
    state = undefined;

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
