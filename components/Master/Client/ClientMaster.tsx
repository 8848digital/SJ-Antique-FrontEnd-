import TabSection from '@/components/TabSection';
import useClienthook from '@/hooks/master/client/client-hook';
import { get_client_name_data } from '@/store/slices/Master/get-client-name-slice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import MasterListing from '../MasterListing';
import MasterTableListing from '../common/MasterTableListing';
import AddMasterRecordForm from './AddClientRecordForm';
import UpdateMasterModal from '../common/UpdateMasterModal';

const ClientMaster = () => {
    const router = useRouter();
    const pathcontent = router?.asPath?.split('/');

    const key = pathcontent[pathcontent?.length - 1];

    const { clientData, handleDeleteBtn, handleInputChange, inputValue, setInputValue, handleMaterialChange, materialValue, handleSaveBtn, handleUpdateBtn, showModal, setShowModal, handleUpdateRecord } = useClienthook()


    return (
        <>
            <div className="container-lg">
                <MasterListing value={key} />
                <div className="d-flex justify-content-center">
                    <TabSection firstTabHeading={"Client Name List"} secondTabHeading={"Create New Client"} />
                </div>
                <div
                    className="tab-content d-flex justify-content-center"
                    id="pills-tabContent"
                >
                    <div
                        className="tab-pane fade show active tab-width"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                    >
                        <MasterTableListing tableData={clientData} handleDeleteBtn={handleDeleteBtn} inputValue={inputValue} seInputValue={setInputValue} handleUpdateBtn={handleUpdateBtn} />
                    </div>

                    <div
                        className="tab-pane fade w-75"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                    >
                        <AddMasterRecordForm handleInputChange={handleInputChange} inputValue={inputValue} seInputValue={setInputValue} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleSaveBtn} />
                    </div>
                </div>
            </div>

            <UpdateMasterModal inputValue={inputValue} showModal={showModal} setShowModal={setShowModal} handleInputChange={handleInputChange} handleMaterialChange={handleMaterialChange} materialValue={materialValue} handleSaveBtn={handleUpdateRecord} />
        </>
    )
}

export default ClientMaster