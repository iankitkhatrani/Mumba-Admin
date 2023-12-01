import React, { useState,useContext,useEffect } from 'react';
import styles from './BotManagement.module.css';
import {useNavigate} from 'react-router-dom';
import offerContext from '../../context/offerContext'



const recordsPerPage = 5;

const BotManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // {
  //   "userid": "1",
  //   "username": "Alice",
  //   "mobilenumber": "123-456-7890",
  //   "gameplayed": 50,
  //   "mainwallet": 1000,
  //   "referralcode": "",
  //   "registration_date": "2023-01-15",
  //   "last_login": "2023-10-05",
  //   "block_user": true,
  //   "status": "Active",
  //   "counter":1
  // },

  let [userData,setUserData] = useState([]);

  const context = useContext(offerContext)
  console.log("Contect ",context)
  const { BotList,BotDelete } = context
  
  useEffect( () => {
    const submitdata = async () => {
    
      setUserData(await BotList())

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
    console.log("User ID  User Bot ",userid)

    navigate('/aBotDetails', {state:userid,Iscom:1});
  };

  const navigateToUserRegister = (userid) => {
    // 👇️ navigate to /contacts 
    console.log("User ID ",userid)

    navigate('/botregistration',{state:1});
  };


  const DeleteUser = async (userid) =>{
    await BotDelete(userid)

    setUserData(await BotList())
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

        <button className={styles.addbtn} onClick={ () => navigateToUserRegister() } >Add User</button>
   
       </div>

       

        <div>
        <input
          type="text"
          placeholder="Search by Username/Mobile Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>VIP</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Games Played</th>
            <th>Main Wallet</th>
            <th>Referral Code</th>
            <th>Registration Date</th>
            <th>Last Login</th>
            <th>Block User</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersOnCurrentPage.map((user,index) => (
            
            (index%2 == 1) ? 

              <tr key={user._id}  className={styles['row-odd']}>
                <td>{user.id}</td>
                <td> <img className={styles.actionButtonIcon} src={user.isVIP == 1?"/Image/Dashbord/Kyc.png":""} /> </td>
                <td>{user.name}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.counters.totalMatch}</td>
                <td>{user.chips}</td>
                <td>{user.referralCode}</td>
                <td>{user.createdAt}</td>
                <td>{user.lastLoginDate}</td>
                <td className={user.block_user ? styles.blocked : styles.active}>
                  {user.block_user ? 'Blocked' : 'Active'}
                </td>
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
              <td>{user.id}</td>
              <td> <img className={styles.actionButtonIcon} src={user.isVIP == 1?"/Image/Dashbord/Kyc.png":""} /> </td>
              <td>{user.name}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.counters.totalMatch}</td>
              <td>{user.chips}</td>
              <td>{user.referralCode}</td>
              <td>{user.createdAt}</td>
              <td>{user.lastLoginDate}</td>
              <td className={user.block_user ? styles.blocked : styles.active}>
                {user.block_user ? 'Blocked' : 'Active'}
              </td>
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
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{margin: "0 1rem"}}>{currentPage} / {totalPages}</span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BotManagement;