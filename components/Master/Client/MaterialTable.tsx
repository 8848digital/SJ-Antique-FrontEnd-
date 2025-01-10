import { get_material_data } from '@/store/slices/Master/get-material-slice';
import React from 'react'
import { useSelector } from 'react-redux';

const MaterialTable = ({ handleMaterialChange, materialValue }: any) => {
    let materialListDataFromStore = useSelector(get_material_data)?.data;

    return (
        <>
            <table className="table table-bordered mt-2">
                <thead>
                    <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">Material</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {materialListDataFromStore && materialListDataFromStore?.length > 0 && materialListDataFromStore.map((materialData: any, index: any) => {
                        return (<tr>
                            <th scope="row">{index + 1}</th>
                            <td scope="row" >{materialData?.material}</td>
                            <td scope="row">
                                <input
                                    type="number"
                                    className="form-control border p-0 px-2"
                                    name="price"
                                    value={materialValue[index]?.price || ""}
                                    onChange={(e) => {
                                        handleMaterialChange(e.target.value, materialData?.material, index);
                                    }}
                                    required
                                    autoComplete="off"
                                />
                            </td>


                        </tr>)

                    })}


                </tbody>
            </table>
        </>
    )
}

export default MaterialTable