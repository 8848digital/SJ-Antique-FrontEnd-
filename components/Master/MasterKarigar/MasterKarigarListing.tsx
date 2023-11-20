import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoadMoreTableDataInMaster from '../LoadMoreTableDataInMaster';

const MasterKarigarListing = ({ karigarData, HandleSearchInput,placeholder }: any) => {
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    setTableViewData(data);
  };
  const router = useRouter()
  const HandleDetails =(name:any)=>{
    router.push({
      pathname:'/master/[karigarId]/KarigarDetailsMaster',
      query: name
    })
  }
  

  return (
    <div>
      <div className="mx-4">
        <input
          type="text"
          name="name"
          id="name"
          aria-describedby="emailHelp"
          className="form-control form-control-color w-25"
          placeholder={placeholder}
          onChange={HandleSearchInput}
        />
      </div>
      {karigarData?.length > 0 && (
        <div className="text-end pe-3 p-0 text-gray small ">
          {karigarData?.slice(0, tableViewData)?.length} of{' '}
          {karigarData?.length < 10
            ? '0' + karigarData?.length
            : karigarData?.length}
        </div>
      )}
      <div className="table-responsive  p-3">
        <table className="table table-hover table-striped w-100 table-bordered ">
          
          <thead>
            <tr className="table_row">
              <th scope="col" className="thead text-start">
                Karigar Name
              </th>
            </tr>
          </thead>
          <tbody> 
            {karigarData?.length > 0 &&
              karigarData !== null &&
              karigarData
              .slice(0, tableViewData)
              .map((item: any, i: any) => (
                <tr key={i} >
                  <td className="table-body-row cursor" onClick={()=>HandleDetails(item.karigar_name)}>
                    {item.karigar_name} 
                  </td>
                </tr>
              ))}
              {karigarData?.length > 20 && karigarData !== null && (
            <LoadMoreTableDataInMaster
              HandleTableViewRows={HandleTableViewRows}
            />
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterKarigarListing;
