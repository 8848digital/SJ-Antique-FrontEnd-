// import ReportApi from '@/services/api/report/get-report-data-api';
// import { RootState } from '@/store/root-reducer';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export const GetItemStatusReport: any = createAsyncThunk(
//   'itemStatusReport/getItemStatusReport',
//   async (params: any, token: any) => {
//     const itemStatusReportData: any = await ReportApi(token, params);
//     console.log('itemStatusReportData res', itemStatusReportData);
//     return itemStatusReportData;
//   }
// );

// interface RepoItemStatusReportState {
//   data: any;
//   docStatus: any;
//   error: string;
//   isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
// }

// const initialState: RepoItemStatusReportState = {
//   data: '',
//   docStatus: '',
//   error: '',
//   isLoading: 'idle',
// };

// export const GetItemStatusReportScreen = createSlice({
//   name: 'itemStatusReport',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(GetItemStatusReport.pending, (state) => {
//       state.isLoading = 'pending';
//       state.data = '';
//       state.docStatus = '';
//     });
//     builder.addCase(GetItemStatusReport.fulfilled, (state, action) => {
//       if (
//         action?.payload?.status === 200 &&
//         action?.payload?.data?.message?.status === 'success'
//       ) {
//         state.data = action?.payload?.data?.message?.data;
//         state.docStatus = action?.payload?.data?.message?.data?.docstatus;
//         state.isLoading = 'succeeded';
//       } else {
//         state.data = '';
//         state.docStatus = '';
//         state.isLoading = 'succeeded';
//       }
//     });
//     builder.addCase(GetItemStatusReport.rejected, (state) => {
//       state.isLoading = 'failed';
//       state.data = '';
//       state.docStatus = '';
//       state.error = 'failed to store data';
//     });
//   },
// });

// export const get_item_status_report_data = (state: RootState) =>
//   state.GetItemStatusReportScreen;

// export default GetItemStatusReportScreen.reducer;
