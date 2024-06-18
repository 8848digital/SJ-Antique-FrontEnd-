import useKarigarHooks from '@/hooks/master/master-karigar-hook';
import { useRouter } from 'next/router';
import MasterSingleRecord from './MasterSingleListing/MasterSingleRecord';

const IndexPage = () => {
  const {
    karigarList,
    kunKarigarList,
    inputValue,
    setInputValue,
    HandleInputValue,
    HandleSubmit,
    HandleKunInputValue,
    HandleKunSubmit,
    error,
    setError,
    showAddRecord,
    handleShowAddRecord,
    handleCloseAddRecord,
    showDeleteModal,
    setShowDeleteModal,
    handleCloseDeleteModal,
    handleShowDeleteModal,
    deleteRecord,
    handleUpdateKarigar,
    handleUpdateKunKarigar
  }: any = useKarigarHooks();

  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];

  return (
    <div>
      {key === 'karigar' && (
        <MasterSingleRecord
          karigarData={karigarList}
          inputValue={inputValue}
          HandleInputValue={HandleInputValue}
          HandleSubmit={HandleSubmit}
          error={error}
          setError={setError}
          value={key}
          placeholder={'Karigar Name'}
          tab1={'Karigar List'}
          tab2={'Create New Karigar'}
          showDeleteModal={showDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          setInputValue={setInputValue}
          handleUpdate={handleUpdateKarigar}
        />
      )}
      {key === 'kundanKarigar' && (
        <MasterSingleRecord
          karigarData={kunKarigarList}
          inputValue={inputValue}
          HandleInputValue={HandleKunInputValue}
          HandleSubmit={HandleKunSubmit}
          error={error}
          setError={setError}
          value={key}
          placeholder={'Kundan Karigar Name'}
          tab1={'Kundan Karigar List'}
          tab2={'Create New Kundan Karigar'}
          showDeleteModal={showDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          handleShowDeleteModal={handleShowDeleteModal}
          deleteRecord={deleteRecord}
          showAddRecord={showAddRecord}
          handleShowAddRecord={handleShowAddRecord}
          handleCloseAddRecord={handleCloseAddRecord}
          setInputValue={setInputValue}
          handleUpdate={handleUpdateKunKarigar}
        />
      )}
    </div>
  );
};

export default IndexPage;
