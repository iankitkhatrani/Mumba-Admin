import React, {useState, useContext,useEffect } from 'react'
import styles from './AUserDetails.module.css';
import UserInfo from '../UserInfo/UserInfo';
import RouletteHistory from '../RouletteHistory/RouletteHistory';
import CompleteWithdrawal from '../CompleteWithdrawal/CompleteWithdrawal';
import CompleteDeposite from '../CompleteDeposite/CompleteDeposite';
import RegisterReferralBonus from '../RegisterReferralBonus/RegisterReferralBonus';
import MyReferrals from '../MyReferrals/MyReferrals';
import { useNavigate,useLocation } from 'react-router-dom';
import offerContext from '../../../context/offerContext'

const AUserDetails = () => {

    const location = useLocation();
    console.log("location ", location)
    const userID = location.state;
    console.log("state ", userID)

    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts 
        navigate('/playermanagement');
    };

    const context = useContext(offerContext)
    const { PlayerData,GetRouletteHistoryData,GetCompleteWithdrawalData,GetCompleteDespositeData,GetRegisterReferralBonusData,GetMyReferralData } = context
    let [userInfo,SetuserInfo] = useState({})
    let [rouletteHistory,SetrouletteHistory] = useState([])
    let [completeWithdrawal,SetcompleteWithdrawal] = useState([])
    let [completeDeposite,SetcompleteDeposite] = useState([])
    let [registerReferralBonus,SetregisterReferralBonus] = useState([])
    let [myReferral,SetmyReferral] = useState([])





    console.log("rouletteHistory ::::::::::::::::::",rouletteHistory)

    useEffect(() => {
        const submitdata = async () => {
            SetuserInfo(await PlayerData(userID))
            SetrouletteHistory(await GetRouletteHistoryData(userID) )
            SetcompleteWithdrawal(await GetCompleteWithdrawalData(userID) )
            SetcompleteDeposite(await GetCompleteDespositeData(userID) )
            SetregisterReferralBonus(await GetRegisterReferralBonusData(userID))
            SetmyReferral(await GetMyReferralData(userID) )
        }
        submitdata()
    }, []);

    return (
        <>
            <div className={styles.aUserDetails}>
                <div className={styles.aUserDetailsTop}>
                    <h2 className={styles.aUserDetailsTopText}>User Details</h2>
                    <div className={styles.aUserDetailsTopButton}><button className={styles.aUserDetailsTopButton} onClick={() => navigateToContacts()} > Back </button> </div>
                </div>
                <div className={styles.aUserDetailsLayout}>
                    <div className={styles.aUserDetailsLeft}>
                        <UserInfo userInfo={userInfo}/>

                    </div>
                    <div className={styles.aUserDetailsRight}>
                        <RouletteHistory rouletteHistorydata={rouletteHistory} />
                        <CompleteWithdrawal completeWithdrawalData={completeWithdrawal}/>
                        <CompleteDeposite completeDepositeData={completeDeposite}/>
                        <RegisterReferralBonus registerReferralBonusData ={registerReferralBonus} />
                        <MyReferrals myReferralData={myReferral} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AUserDetails