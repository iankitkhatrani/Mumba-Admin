import React, { useState,useContext,useEffect } from 'react';
import styles from './AgentManagement.module.css';
import {useNavigate} from 'react-router-dom';
import offerContext from '../../context/offerContext'
import Cookies from 'universal-cookie';
const cookies = new Cookies();



const recordsPerPage = 5;

const AgentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  let [userData,setUserData] = useState([]);

  const context = useContext(offerContext)
  console.log("Contect ",context)
  const { AgentList,AgentDelete } = context
  
  useEffect( () => {
    const submitdata = async () => {
    
      setUserData(await AgentList())

  }

  console.log("cookies.get('name') ",cookies.get('name'))
  if(cookies.get('name') != "Super Admin"){
    console.log("ClickLogout")
    localStorage.removeItem('token')
    cookies.remove('token');
    window.location.reload(true)
  }

  submitdata()
  },[]);

  // Filter the user data based on date range and search term
  const filteredUsers = userData.filter((user) => {
    const registrationDate = new Date(user.createdAt);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return (
      (!from || registrationDate >= from) &&
      (!to || registrationDate <= to) &&
      (searchTerm === '' ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileNumber.includes(searchTerm))
    );
  });

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  // Filter the user data for the current page
  const usersOnCurrentPage = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const resetDate=()=>{
    setFromDate("")
    setToDate("")
  }
  const navigate = useNavigate();
  const navigateToContacts = (userid) => {
    // 👇️ navigate to /contacts 
    console.log("User ID ",userid)

    navigate('/agentDetails', {state:userid});
  };

  const navigateToUserRegister = (userid) => {
    // 👇️ navigate to /contacts 
    console.log("User ID ",userid)

    navigate('/AgentRegistration',{state:0});
  };


  const DeleteUser = async (userid) =>{
    await AgentDelete(userid)

    setUserData(await AgentList())
  }
  

  return (
    <div className={styles['player-management-container']}>

      <div className={styles.filters}>
       <div className={styles.filters}>
       <input
          type="date"
          placeholder="From Date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="To Date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={{marginLeft: "1rem"}}
        />
        <button className={styles.resetbtn} onClick={resetDate}>Reset</button>
        <button className={styles.addbtn} onClick={ () => navigateToUserRegister() } >Add Agent</button>
       </div>
        <div>
        <input
          type="text"
          placeholder="Search by Agent/Mobile Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>Mobile Number</th>
            <th>Location</th>
            <th>Area</th>
            <th>Registration Date</th>
            <th>Last Login</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersOnCurrentPage.map((user,index) => (
            
            (index%2 == 1) ? 

              <tr key={user._id}  className={styles['row-odd']}>
                <td>{user.name}</td>
                <td>{user.mobileno}</td>
                <td>{user.location}</td>
                <td>{user.area}</td>
                <td>{user.createdAt}</td>
                <td>{user.lastLoginDate}</td>
                <td>{user.status}</td>
                <td>
                  <button className={styles['action-button1']} onClick={ () => navigateToContacts(user._id) } >
                    <img className={styles.actionButtonIcon} src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" />
                  </button>
                  <button className={styles['action-button2']} onClick={ () => DeleteUser(user._id) }>
                  <img className={styles.actionButtonIcon} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSewqWoGi9-fXmd6_SKqNkg6-kmo7VctpXAhgBiKaliSA&s" />
                  </button>
                </td>
              </tr> : <tr key={user._id}  >
              <td>{user.name}</td>
              <td>{user.mobileno}</td>
              <td>{user.location}</td>
                <td>{user.area}</td>
              <td>{user.createdAt}</td>
              <td>{user.lastLoginDate}</td>
              <td>{user.status}</td>
              <td>
                <button className={styles['action-button1']} onClick={ () => navigateToContacts(user._id) } >
                  <img className={styles.actionButtonIcon} src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" />
                </button>
                <button className={styles['action-button2']} onClick={ () => DeleteUser(user._id) } >
                <img className={styles.actionButtonIcon} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSewqWoGi9-fXmd6_SKqNkg6-kmo7VctpXAhgBiKaliSA&s" />
                  
                </button>
              </td>
            </tr>

            
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
        style={{"borderRadius": "15px"}}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{margin: "0 1rem"}}>{currentPage} / {totalPages}</span>
        <button
        style={{"borderRadius": "15px"}}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AgentManagement;