import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadMoreTableDataInMaster from '../LoadMoreTableDataInMaster';
import styles from '../../../styles/master.module.css';

const MasterMaterialListing = ({
  materialList,
  handleInputChange1,
  handleInputChange2,
  handleInputChange3,
  placeholder1,
  placeholder2,
  placeholder3,
  value,
}: any) => {
  console.log(materialList, 'kuncsotdata');
  const [tableViewData, setTableViewData] = useState<any>(20);

  const HandleTableViewRows: any = (data: any) => {
    setTableViewData(data);
  };
  const router = useRouter();
  const HandleDetails = (name: any, abbr: any, group?: any) => {
    router.push({
      pathname: '/masterMaterialDetails',
      query: {
        name1: name,
        name2: abbr,
        name3: group,
        placeholder1: placeholder1,
        placeholder2: placeholder2,
        placeholder3: placeholder3,
      },
    });
  };
  return (
    <div>
      <div className={` d-flex  justify-content-start `}>
        <input
          type="text"
          name="input1"
          id="input1"
          aria-describedby="emailHelp"
          className="form-control h-50 mx-2 p-1 w-auto"
          placeholder={placeholder1}
          onChange={handleInputChange1}
        />

        <input
          type="text"
          name="input2"
          id="input2"
          aria-describedby="emailHelp"
          className="form-control h-50 mx-2 p-1 w-auto"
          placeholder={placeholder2}
          onChange={handleInputChange2}
        />
        {value === 'material' && (
          <input
            type="text"
            name="input3"
            id="input3"
            aria-describedby="emailHelp"
            className="form-control h-50 mx-2 p-1 w-auto"
            placeholder={placeholder3}
            onChange={handleInputChange3}
          />
        )}
      </div>

      <div className="table-responsive mt-2 ">
        {materialList?.length > 0 && (
          <div className="text-end pe-3 text-gray small m-0">
            {materialList?.slice(0, tableViewData)?.length} of{' '}
            {materialList?.length < 10
              ? '0' + materialList?.length
              : materialList?.length}
          </div>
        )}

        <table className="table table-hover table-striped table-bordered w-100 ">
          <thead>
            <tr className="table_row">
              <th className="thead text-start">Sr.No</th>
              <th className="thead text-start ">{placeholder1}</th>
              <th className="thead text-start ">{placeholder2}</th>
              {value === 'material' && (
                <th className="thead text-start ">{placeholder3}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {materialList?.length > 0 &&
              materialList !== null &&
              materialList.slice(0, tableViewData).map((item: any, i: any) => (
                <tr key={i}>
                  <td
                    className="table-body-row cursor"
                    style={{ width: '80px' }}
                  >
                    {i + 1}
                  </td>
                  <td
                    className={`table-body-row cursor ${
                      value === 'material' ? 'w-auto' : ' w-50 '
                    } `}
                    onClick={() =>
                      HandleDetails(
                        item.material,
                        item.material_abbr ? item.material_abbr : item.type,
                        item.material_group
                      )
                    }
                  >
                    {item.material}
                  </td>
                  <td
                    className={`table-body-row cursor w-auto`}
                    onClick={() =>
                      HandleDetails(
                        item.material,
                        item.material_abbr ? item.material_abbr : item.type,
                        item.material_group
                      )
                    }
                  >
                    {item.material_abbr ? item.material_abbr : item.type}
                  </td>
                  {value === 'material' && (
                    <td
                      className="table-body-row cursor w-auto"
                      onClick={() =>
                        HandleDetails(
                          item.material,
                          item.material_abbr ? item.material_abbr : item.type,
                          item.material_group
                        )
                      }
                    >
                      {item.material_group}
                    </td>
                  )}
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
