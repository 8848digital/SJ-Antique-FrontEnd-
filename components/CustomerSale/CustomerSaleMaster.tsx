import CurrentDate from '@/components/CurrentDate';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from '../../styles/readyReceipts.module.css';
// import styles from '../styles/readyReceipts.module.css';

const CustomerSaleMaster = () => {
  const [tableData, setTableData] = useState<any>([
    {
      id: 1,
      item: '',
      Gwt: '',
      CsWt: '',
      KunWt: '',
      NetWt: '',
      CS: '',
      KunPc: '',
      Other: '',
      Total: '',
    },
  ]);
  const handleFieldChange = (id: number, field: string, newValue: any) => {
    const updatedData = tableData.map((item: any) => {
      if (item.id === id) {
        return { ...item, [field]: newValue };
      }
      return item;
    });
    setTableData(updatedData);
  };
  const handleAddRow = () => {
    const newRow = {
      id: tableData.length + 1,
      item: '',
      Gwt: '',
      CsWt: '',
      KunWt: '',
      NetWt: '',
      CS: '',
      KunPc: '',
      Other: '',
      Total: '',
    };
    setTableData([...tableData, newRow]);
  };
  const handleDeleteRow = (id: any) => {
    const updatedData = tableData.filter((item: any) => item.id !== id);
    setTableData(updatedData);
  };
  const handleTabPress = (event: any, id: any) => {
    if (event.key === 'Tab' && id === tableData[tableData.length - 1].id) {
      handleAddRow();
    }
  };
  return (
    <div className="container-lg">
      <div>
        <div
          className="nav nav-pills mb-3 justify-content-center"
          id="pills-tab"
          role="tablist"
        >
          <div className="nav-tabs tabs-container w-50" role="presentation">
            <button
              className="nav-link active w-100 border p-1"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Customer-Sale(Customer)
            </button>
          </div>
          <div className="nav-tabs tabs-container w-50" role="presentation">
            <button
              className="nav-link w-100 border p-1"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Create new sale return
            </button>
          </div>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            Customer Sales-(Customer)
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div>
              <div>
                <div className={`${styles.button_field}`}>
                  <button type="submit" className={`${styles.create_button}`}>
                    Create
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="thead" scope="col">
                          Transaction Date
                        </th>
                        <th className="thead" scope="col">
                          Receipt no
                        </th>
                        <th className="thead" scope="col">
                          Customer
                        </th>
                        <th className="thead" scope="col">
                          Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="table_row" scope="row">
                          <CurrentDate />
                        </td>
                        <td className="table_row">
                          <input
                            className="form-control input-sm"
                            type="number"
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className="form-control input-sm"
                            type="text"
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className="form-control input-sm"
                            type="text"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="container d-flex justify-content-end">
                <button
                  className={`btn btn-link`}
                  onClick={() => handleAddRow()}
                >
                  Add Row
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped ">
                  <thead>
                    <tr>
                      <th className="thead" scope="col">
                        Sr. no
                      </th>
                      <th className="thead" scope="col">
                        Item
                      </th>
                      <th className="thead" scope="col">
                        G Wt
                      </th>
                      <th className="thead" scope="col">
                        C/s Wt
                      </th>
                      <th className="thead" scope="col">
                        Kun Wt
                      </th>
                      <th className="thead" scope="col">
                        Net Wt
                      </th>
                      <th className="thead" scope="col">
                        C/S
                      </th>
                      <th className="thead" scope="col">
                        Kun Pc
                      </th>
                      <th className="thead" scope="col">
                        Other
                      </th>
                      <th className="thead" scope="col">
                        Total
                      </th>
                      <th className="thead" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item: any) => (
                      <tr key={item.id}>
                        <td className="table_row">{item.id}</td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="text"
                            value={item.item}
                            onChange={(e) =>
                              handleFieldChange(item.id, 'item', e.target.value)
                            }
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={item.Gwt}
                            onChange={(e) =>
                              handleFieldChange(item.id, 'Gwt', e.target.value)
                            }
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={item.CsWt}
                            onChange={(e) =>
                              handleFieldChange(item.id, 'CsWt', e.target.value)
                            }
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={item.KunWt}
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'KunWt',
                                e.target.value
                              )
                            }
                            //onKeyDown={(e) => handleModal(e, item.id)}
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={item.NetWt}
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'NetWt',
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={item.CS}
                            onChange={(e) =>
                              handleFieldChange(item.id, 'CS', e.target.value)
                            }
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="number"
                            value={item.KunPc}
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'KunPc',
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="text"
                            value={item.Other}
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'Other',
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="table_row">
                          <input
                            className={` ${styles.input_field}`}
                            type="text"
                            value={item.Total}
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                'Total',
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="table_row">
                          <button
                            onKeyDown={(e) => handleTabPress(e, item.id)}
                            className="d-flex align-items-center delete-link p-1 border-0"
                            onClick={() => handleDeleteRow(item.id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: 'red', fontSize: 15 }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSaleMaster;
