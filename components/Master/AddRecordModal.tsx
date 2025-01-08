import { Button, Modal } from 'react-bootstrap';
import SearchSelectInputField from '../InputDropdown/SearchSelectInputField';
import { useRouter } from 'next/router';

const AddRecordModal = ({
  showAddRecord,
  handleCloseAddRecord,
  inputValue,
  HandleInputValue,
  handleUpdate,
  nameValue,
  HandleNameChange,
  error1,
  error2,
  error3,
  placeholder1,
  placeholder2,
  placeholder3,
  DropdownList,
  selectDropDownReset,
  setSelectDropDownReset,
  value,
  searchClient,
  setSearchClient,
  isMultiple,
}: any) => {
  const router = useRouter();
  const pathcontent = router?.asPath?.split('/');

  const key = pathcontent[pathcontent?.length - 1];
  return (
    <>
      <Modal show={showAddRecord} onHide={handleCloseAddRecord}>
        <Modal.Header closeButton>
          <Modal.Title>Update {placeholder1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isMultiple ? (
            <>
              <div className=" m-1">
                <label>{placeholder1}</label>
              </div>
              <div className="p-1">
                <input
                  type="text"
                  className="form-control w-50 border p-1 h-50"
                  value={inputValue?.name}
                  name='name'
                  onChange={(e) => {
                    HandleInputValue(e);
                  }}
                  required
                />
              </div>
              <div>{error1 && <p className="text-danger">{error1}</p>}</div>

              {
                (key === "karigar" || key === "kundanKarigar") && (
                  <>
                    <div className=" m-1">
                      <label>Karigar Code</label>
                    </div>
                    <div className="p-1">
                      <input
                        type="text"
                        className="form-control w-50 border p-1 h-50"
                        value={inputValue?.karigar_code}
                        name='karigar_code'
                        onChange={(e) => {
                          HandleInputValue(e);
                        }}
                        required
                      />
                    </div>
                    <div>{error1 && <p className="text-danger">{error1}</p>}</div>

                  </>)}
            </>
          ) : (
            <>
              <div className="m-1">
                <label htmlFor="">{placeholder1}</label>
              </div>
              <div className="p-1">
                <input
                  type="text"
                  className="form-control w-50 border p-0 px-2"
                  name="material"
                  value={nameValue?.material}
                  onChange={(e) => {
                    HandleNameChange(e);
                  }}
                  required
                  autoComplete="off"
                />
              </div>

              <div> {error1 && <p className="text-danger">{error1}</p>}</div>
              <div className=" m-1">
                <label htmlFor="">{placeholder2}</label>
              </div>
              <div className="col-lg-6">
                {value === 'client' ? (
                  <SearchSelectInputField
                    karigarData={DropdownList}
                    className={'form-control  border p-0 px-2'}
                    placeholder={placeholder2}
                    selectedDropdownValue={searchClient}
                    setSelectedDropdownValue={setSearchClient}
                    selectDropDownReset={selectDropDownReset}
                    setSelectDropDownReset={setSelectDropDownReset}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control border p-0 px-2"
                    name="material_abbr"
                    value={nameValue?.material_abbr || nameValue?.type}
                    onChange={(e) => {
                      HandleNameChange(e);
                    }}
                    required
                    autoComplete="off"
                  />
                )}
              </div>
              <div> {error2 && <p className="text-danger">{error2}</p>}</div>
              {(value === 'material' || value === 'subCategory') && (
                <>
                  <div className=" m-1">
                    <label htmlFor="">{placeholder3}</label>
                  </div>
                  <div className="col-lg-6">
                    <SearchSelectInputField
                      karigarData={DropdownList}
                      className={'form-control border p-0 px-2'}
                      placeholder={placeholder3}
                      selectedDropdownValue={searchClient}
                      setSelectedDropdownValue={setSearchClient}
                      selectDropDownReset={selectDropDownReset}
                      setSelectDropDownReset={setSelectDropDownReset}
                    />
                  </div>
                  {/* <div> {error3 && <p className="text-danger">{error3}</p>}</div> */}
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddRecord}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRecordModal;
