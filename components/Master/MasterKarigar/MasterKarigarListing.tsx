import React, { useState } from 'react';
import { useRouter } from 'next/router';

const MasterKarigarListing = ({ karigarData, HandleSearchInput,placeholder }: any) => {
  console.log(karigarData, 'master karigar data')
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
      {karigarData.length > 0 &&(
        <div className='text-end text-gray'>
          {karigarData.length} of {karigarData.length}
        </div>
      )}
      <div className="table-responsive border p-3 mt-2">
        <table className="table table-hover table-striped w-100 ">
          
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
              karigarData.map((item: any, i: any) => (
                <tr key={i} >
                  <td className="table-body-row cursor" onClick={()=>HandleDetails(item.karigar_name)}>
                    {item.karigar_name} 
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterKarigarListing;
