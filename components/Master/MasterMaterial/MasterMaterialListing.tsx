import { useRouter } from 'next/router';
import React, { useState } from 'react';
import LoadMoreTableDataInMaster from '../LoadMoreTableDataInMaster';
import SearchSelectInputField from '@/components/SearchSelectInputField/SearchSelectInputField';

const MasterMaterialListing = ({
  materialList,
  handleInputChange1,
  handleInputChange2,
  placeholder1,
  placeholder2,
}: any) => {
  console.log(materialList, 'kuncsotdata');
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    setTableViewData(data);
  };
  const router = useRouter();
  const HandleDetails = (name: any, abbr: any) => {
    console.log(name, abbr, 'name abbr1');
    router.push({
      pathname: '/masterMaterialDetails',
      query: {
        name1: name,
        name2: abbr,
        placeholder1: placeholder1,
        placeholder2: placeholder2,
      },
    });
  };
  return (
    <div>
      <div className="mx-4 d-flex justify-content-start w-50">
        <input
          type="text"
          name="input1"
          id="input1"
          aria-describedby="emailHelp"
          className="form-control min-vw-50 h-50 mx-2 p-1"
          placeholder={placeholder1}
          onChange={handleInputChange1}
        />

        <input
          type="text"
          name="input2"
          id="input2"
          aria-describedby="emailHelp"
          className="form-control min-vw-50 h-50 mx-2 p-1"
          placeholder={placeholder2}
          onChange={handleInputChange2}
        />
      </div>
      {materialList?.length > 0 && (
        <div className="text-end pe-3 text-gray small m-0">
          {materialList?.slice(0, tableViewData)?.length} of{' '}
          {materialList?.length < 10
            ? '0' + materialList?.length
            : materialList?.length}
        </div>
      )}
      <div className="table-responsive mt-2 ">
        <table className="table table-hover table-striped table-bordered w-100 ">
          <thead>
            <tr className="table_row">
              <th className="thead text-start w-50">{placeholder1}</th>
              <th className="thead text-start">{placeholder2}</th>
            </tr>
          </thead>
          <tbody>
            {materialList?.length > 0 &&
              materialList !== null &&
              materialList.slice(0, tableViewData).map((item: any, i: any) => (
                <tr key={i}>
                  <td
                    className="table-body-row cursor w-50"
                    onClick={() =>
                      HandleDetails(
                        item.material,
                        item.material_abbr ? item.material_abbr : item.type
                      )
                    }
                  >
                    {item.material}
                  </td>
                  <td
                    className="table-body-row cursor"
                    onClick={() =>
                      HandleDetails(
                        item.material,
                        item.material_abbr ? item.material_abbr : item.type
                      )
                    }
                  >
                    {item.material_abbr ? item.material_abbr : item.type}
                  </td>
                </tr>
              ))}
            {materialList?.length > 20 && materialList !== null && (
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

export default MasterMaterialListing;
