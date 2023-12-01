

import React,{useContext,useEffect,useState,useRef} from 'react';
import styles from './AdminPage.module.css';
import offerContext from '../../context/offerContext'


const AdminPage = () => {

  const [jsonData,setJsonData] =  useState([
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" },
    { icon: "/Image/Dashbord/user.png", username: "satish", createdAt: "24aug", time: "11pm" }, 
    // Add more user data here
  ]);


  // Sort the data by date in descending order to get the latest users first
  const sortedData = jsonData//jsonData.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const context = useContext(offerContext)
  console.log("Contect ",context)
  const { dashboardData,latatestUser } = context
  let apiData = {}

  let [totalUser, settotalUser] = useState('');
  let [totalDeposit, settotalDeposit] = useState('');
  let [totalWithdraw, settotalWithdraw] = useState('');
  let [todayDeposit, settodayDeposit] = useState('');
  let [todayWithdraw, setTodaywithdraw] = useState('');
  let [todayKYC, setTodaykYC] = useState('');
  let [totalGamePay, setTotalgamePay] = useState('');

  useEffect( () => {
    const submitdata = async () => {
      apiData = await dashboardData()
      if(apiData.totalUser != undefined)
      settotalUser(apiData.totalUser)

      if(apiData.totalDeposit != undefined)
      settotalDeposit(apiData.totalDeposit)

      if(apiData.totalWithdraw != undefined)
      settotalWithdraw(apiData.totalWithdraw)

      if(apiData.todayDeposit != undefined)
      settodayDeposit(apiData.todayDeposit)

      if(apiData.todayWithdraw != undefined)
      setTodaywithdraw(apiData.todayWithdraw)

      if(apiData.todayKYC != undefined)
      setTodaykYC(apiData.todayKYC)

      if(apiData.totalGamePay != undefined)
      setTotalgamePay(apiData.totalGamePay)

      setJsonData(await latatestUser())

  }

  submitdata()
  },[]);
  


  // Create an array to hold rows of users
  const userRows = [];
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  for (let i = 0; i < sortedData.length; i += 6) {
    const usersInRow = sortedData.slice(i, i + 6);

    // Create a row of users
    const row = (
      <div className={styles.userRow} key={`row-${i}`}>
        {usersInRow.map((user, index) => (
          <div className={styles.userBox} key={`user-${i}-${index}`}>
            <div className={styles.user}>
              <img src={"/Image/Dashbord/user.png"} alt="Icon" />
              <p> {user.username}</p>
              <p> {new Date(user.createdAt).getDate()+"-"+month[new Date(user.createdAt).getMonth()]}</p>
              <p> {new Date(user.createdAt).getHours()+":"+new Date(user.createdAt).getMinutes()}</p>
            </div>
          </div>
        ))}
      </div>
    );

    userRows.push(row);
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.row}>
        <div className={styles.rectangle}>
          <div className={styles.icon}> <img src="/Image/Dashbord/user.png" alt="Icon" /></div>
          <div className={styles.text}>
            <h3>{totalUser}</h3>
            <p>All Users</p>
          </div>
        </div>
        <div className={styles.rectangle}>
          <div className={styles.icon}> <img src="/Image/Dashbord/Deposit.png" alt="Icon" /></div>
          <div className={styles.text}>
            <h3>{totalDeposit}</h3>
            <p>Total Deposit</p>
          </div>
        </div>
        <div className={styles.rectangle}>
          <div className={styles.icon}> <img src="/Image/Dashbord/withdraw.png" alt="Icon" /></div>
          <div className={styles.text}>
            <h3>{totalWithdraw}</h3>
            <p>Total Withdraw</p>
          </div>
        </div>
        <div className={styles.rectangle}>
          <div className={styles.icon}> <img src="/Image/Dashbord/Deposit.png" alt="Icon" /></div>
          <div className={styles.text}>
            <h3>{todayDeposit}</h3>
            <p>Todays Deposit</p>
          </div>
        </div>
       
      </div>
      <div className={styles.row}>
        <div className={styles.rectangle}>
          <div className={styles.icon}> <img src="/Image/Dashbord/withdraw.png" alt="Icon" /></div>
          <div className={styles.text}>
            <h3>{todayWithdraw}</h3>
            <p>Todays Withdraw</p>
          </div>
        </div>
        <div className={styles.rectangle}>
          <div className={styles.icon}> <img src="/Image/Dashbord/Kyc.png" alt="Icon" /></div>
          <div className={styles.text}>
            <h3>{todayKYC}</h3>
            <p>Todays KYC</p>
          </div>
        </div>
        <div className={styles.rectangle}>
          <div className={styles.icon}> <img src="/Image/Dashbord/Game played.png" alt="Icon" /></div>
          <div className={styles.text}>
            <h3>{totalGamePay}</h3>
            <p>Game Played</p>
          </div>
        </div>

      </div>

      <div className={styles.latestUsersContainer}>
        <div className={styles.latatestuser}>Latatest User</div>
        {userRows}
      </div>


    </div>
  );
};

export default AdminPage;

