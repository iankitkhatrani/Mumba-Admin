// Navbar.js
import React, { useState,useContext } from 'react';
import styles from './Navbar.module.css'; // Import CSS module
import { ChevronDown, ChevronRight } from "react-feather"
import { useSelector } from 'react-redux';
import offerContext from '../../context/offerContext'
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmindropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen(!isAdmindropdownOpen)
  }

  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(1);


  const handleClose = () =>{
    setShow(false);
    setCounter(false)
  }
    const handleShow = () => setShow(true);

  
  const handleClickLogOut = () =>{
    console.log("ClickLogout")
    localStorage.removeItem('token')
    cookies.remove('token');
    window.location.reload(true)
  }

  const context = useContext(offerContext)
  const { adminname,adminEmail,LogoutClick } = context


  const activePage = useSelector((state) => state.newCurrentPage)
  console.log(activePage)
  return (
    <>
    <nav className={styles.navbar}>
      <div className={styles.toggleButton} onClick={toggleNavbar}>
        <img className={styles.toggleButton1} src="/Image/Sidebar/ham.png" alt="User" />
      </div>
      <div className={styles.adminInfoActivepage}>{activePage.value}</div>
      <div >
          <input className={styles.navbarSearchInput} type="text" placeholder='Search...' />
      </div>
      <div className={styles.navbarNotification}>
        <img className={styles.navbarNotificationIcon} onClick={handleShow} src="/Image/Sidebar/Noti.png" alt="User" />
        {counter && <div className={styles.notificationBadge}>{counter}</div> }
      </div>
      <div className={styles.navbarNotification}>
        <img className={styles.navbarNotificationIcon} src="/Image/Sidebar/mail.png" alt="User" />
      </div>
      <div className={styles.navbarNotification}>
        <img className={styles.navbarNotificationIcon} src="/Image/Sidebar/cal.png" alt="User" />
      </div>
      <div className={styles.adminInfo}>
        <div className={styles.adminInfoleft}>
          <img src="/Image/Sidebar/icon.png" alt="Admin" />
          <div>
          <div>{adminname}</div>
          <div>{adminEmail}</div>
          </div>
        </div>
      </div>
      <div>
      <Button  onClick={() => handleClickLogOut('login')} className={styles.logoutbtn} variant="danger">Logout</Button>
      </div>
    </nav>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Clear
          </Button>
         
        </Modal.Footer>
      </Modal>
      </>
  );
}

export default Navbar;
