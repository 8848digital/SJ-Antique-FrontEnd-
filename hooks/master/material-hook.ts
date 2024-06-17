import postGroupDataApi from '@/services/api/Master/post-client-group-api';
import postMaterialMasterApi from '@/services/api/Master/post-material-name';
import {
  getMaterialGroupData,
  get_material_group_data,
} from '@/store/slices/Master/get-material-group-slice';
import {
  getMaterialData,
  get_material_data,
} from '@/store/slices/Master/get-material-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDeleteModal } from '../DeleteModal/delete-modal-hook';

const useMaterialHook = () => {
  const {
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
  }: any = useDeleteModal();
  const [showAddRecord, setShowAddRecord] = useState(false);

  const dispatch = useDispatch();
  const loginAcessToken = useSelector(get_access_token);
  let materialList = useSelector(get_material_data).data;
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
  const [nameValue, setNameValue] = useState({
    material: '',
    material_abbr: '',
  });
  const [inputValueM, setInputValueM] = useState('');
  const [errorM, setErrorM] = useState('');
  let materialGroupList = useSelector(get_material_group_data).data;
  const [selectedMaterialGroup, setSelectedMaterialGroup] = useState();
  const [matDropdownReset, setMatDropDownReset] = useState<boolean>(false);

  const HandleNameChange = (e: any) => {
    const { name, value } = e.target;
    setNameValue({ ...nameValue, [name]: value });
    setError1('');
    setError2('');
  };
  const HandleSave = async () => {
    const values = {
      version: 'v1',
      method: 'create_material',
      entity: 'material',
      data: [{ ...nameValue, material_group: selectedMaterialGroup }],
    };

    if (nameValue.material === '' || nameValue.material === undefined) {
      setError1('Input field cannot be empty');
    } else if (
      nameValue.material_abbr === '' ||
      nameValue.material_abbr === undefined
    ) {
      setError2('Input field cannot be empty');
    } else if (
      selectedMaterialGroup === '' ||
      selectedMaterialGroup === undefined
    ) {
      setError3('Input field cannot be empty');
    } else {
      let apiRes: any = await postMaterialMasterApi(
        loginAcessToken?.token,
        values
      );
      if (apiRes?.status === 'success') {
        toast.success('Material Name Created');
        dispatch(getMaterialData(loginAcessToken.token));
      } else {
        toast.error('Material Name already exist');
      }
      setError1('');
      setNameValue({
        material: '',
        material_abbr: '',
      });
      setMatDropDownReset(true);
    }
  };
  // post material group
  const HandleMaterialGrpSubmit = async () => {
    const values = {
      version: 'v1',
      method: 'create_material_group',
      entity: 'material_group',
      material_group: inputValueM,
    };

    if (inputValueM.trim() === '') {
      setErrorM('Input field cannot be empty');
    } else {
      let apiRes: any = await postGroupDataApi(loginAcessToken?.token, values);
      if (apiRes?.status === 'success' && apiRes?.hasOwnProperty('data')) {
        toast.success('Material Group Created');
        dispatch(getMaterialGroupData(loginAcessToken.token));
      } else {
        toast.error('Material Group already exist');
      }
      setErrorM('');
      setInputValueM('');
    }
  };
  const HandleMaterialGrpValue = (e: any) => {
    setErrorM('');
    setInputValueM(e.target.value);
  };
  const handleCloseAddRecord = () => {
    setShowAddRecord(false);
    setNameValue({
      material: '',
      material_abbr: '',
    });
  };
  const handleShowAddRecord = (item: any) => {
    if(item?.karigar_name){
      setInputValueM(item?.karigar_name)
    }else{
      setNameValue(item);
    }
    setShowAddRecord(true);
  };

  return {
    materialList,
    error1,
    error2,
    error3,
    nameValue,
    setNameValue,
    HandleNameChange,
    HandleSave,
    HandleMaterialGrpSubmit,
    HandleMaterialGrpValue,
    errorM,
    setErrorM,
    materialGroupList,
    inputValueM,
    setInputValueM,
    selectedMaterialGroup,
    setSelectedMaterialGroup,
    matDropdownReset,
    setMatDropDownReset,
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    showAddRecord,
    handleShowAddRecord,
    handleCloseAddRecord,
  };
};
export default useMaterialHook;
