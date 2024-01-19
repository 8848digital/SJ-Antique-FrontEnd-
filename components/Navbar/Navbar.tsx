import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { ClearToken } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import ReceiptsHeader from '../Header/ReceiptsHeader';
import ReadyReceiptsTabs from '../KundanReadyReceipts/ReadyReceiptsTabs';

const Navbar = () => {
  const router = useRouter();
  const [showReceipt, setShowReceipts] = useState<any>(false);
  const [showSales, setShowSales] = useState<any>(false);
  const [showMaster, setShowMaster] = useState<any>(false);
  const [showReport, setShowReport] = useState<any>(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(ClearToken());
    router.push('/');
  };

  return (
    <div>
      <div className="bg-light">
        <div className="container-lg mt-2">
          <div className="row">
            <div className=" col-lg-11">
              <ReceiptsHeader
                showReceipt={showReceipt}
                setShowReceipts={setShowReceipts}
                showSales={showSales}
                setShowSales={setShowSales}
                showMaster={showMaster}
                setShowMaster={setShowMaster}
                showReport={showReport}
                setShowReport={setShowReport}
              />
            </div>
            <div className="col-lg-1 text-end">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success-light"
                  id="dropdown-basic"
                  className="border bg-light"
                >
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    style={{ color: '#CDAB6E', fontSize: 30 }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="">
                  <Dropdown.Item className="d-flex justify-content-center">
                    Welcome!!
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex justify-content-center">
                    <button className="logout-button " onClick={handleClick}>
                      Logout
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <hr className="mx-3 my-1" />
        <ReadyReceiptsTabs showReceipt={showReceipt} />
      </div>
    </div>
  );
};

export default Navbar;
