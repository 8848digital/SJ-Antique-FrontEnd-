import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../services/assets/Logo.png';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { ClearToken } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import ReceiptsHeader from '../Header/ReceiptsHeader';

const Navbar = () => {
  const router = useRouter();
  const [showButtons1, setShowButtons1] = useState<any>(false);
  const [showButtons2, setShowButtons2] = useState<any>(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(ClearToken());
    router.push('/');
  };

  return (
    <div className="bg-light">
      <div className=" container-lg">
        <nav className="navbar navbar-light p-0 ">
          <div>
            {/* <button className="btn btn-primary mx-5 "
              onClick={()=>setShowButtons1(!showButtons1)}  
                >
                Ready Receipts</button>
      <button className="btn btn-primary mx-5 px-5" 
       onClick={()=>setShowButtons2(!showButtons2)} >Sales</button> */}
          </div>
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

            <Dropdown.Menu className=''>
              <Dropdown.Item className='d-flex justify-content-center' >Welcome!!</Dropdown.Item>
              <Dropdown.Item className='d-flex justify-content-center'>
                <button className='logout-button ' onClick={handleClick}>Logout</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
        <hr />
        <ReceiptsHeader />
      </div>
    </div>
  );
};

export default Navbar;
