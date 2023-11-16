import { useRouter } from 'next/router';
import React from 'react';

const MasterMaterialListing = ({
  materialList,
  handleInputChange1,
  handleInputChange2,
}: any) => {
  const router = useRouter()
  const HandleDetails =(name:any, abbr:any)=>{
    console.log(name,abbr,'name abbr1')
    router.push({
      pathname:'/masterMaterialDetails',
      query: {name, abbr}
    })
  }
  return (
    <div>
      <div className="mx-4 d-flex justify-content- start">
        <input
          type="text"
          name="input1"
          id="input1"
          aria-describedby="emailHelp"
          className="form-control w-25 mx-2"
          placeholder="Enter Material Name"
          onChange={handleInputChange1}
        />
        <input
          type="text"
          name="input2"
          id="input2"
          aria-describedby="emailHelp"
          className="form-control w-25 mx-2"
          placeholder="Enter Material abbreviation"
          onChange={handleInputChange2}
        />
      </div>
      {materialList.length > 0 &&(
        <div className='text-end text-gray'>
          {materialList.length} of {materialList.length}
        </div>
      )}
      <div className="table-responsive border p-3 mt-2">
        <table className="table table-hover table-striped w-100 ">
          <thead>
            <tr className="table_row">
              <th className="thead text-start">Material Name</th>
              <th className="thead text-start">Material Abbrevation</th>
            </tr>
          </thead>
          <tbody>
            {materialList?.length > 0 &&
              materialList !== null &&
              materialList.map((item: any, i: any) => (
                <tr key={i} className="">
                  <td className="table-body-row cursor" 
                  onClick={()=>HandleDetails(item.material, item.material_abbr)}>
                    {item.material}
                  </td>
                  <td className="table-body-row cursor"
                  onClick={()=>HandleDetails(item.material, item.material_abbr)}
                  >
                    {item.material_abbr}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterMaterialListing;
