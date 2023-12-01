import React from 'react'
import styles from './Dashbord.module.css'; // Import CSS module
import Navbar from '../Component/Navbar/Navbar';
import Sidebar from '../Component/Sidebar/Sidebar';
import AdminPage from '../Component/AdminPage/AdminPage';
import PlayerManagement from '../Component/PlayerManagement/PlayerManagement';
import AgentManagement from '../Component/AgentManagement/AgentManagement';
import AgentRegistration from '../Component/AgentRegistration/AgentRegistration';
import AgentDetails from '../Component/AgentDetails/AgentDetails';


import ShopManagement from '../Component/ShopManagement/ShopManagement';
import ShopRegistration from '../Component/ShopRegistration/ShopRegistration';
import ShopDetails from '../Component/ShopDetails/ShopDetails';

import BotManagement from '../Component/BotManagement/BotManagement';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Component/Login/Login';
import SetGameLogic from '../Component/SetGameLogic/SetGameLogic';
import GameHistory from '../Component/GameHistory/GameHistory';
import PlayerRegistration from '../Component/PlayerRegistration/PlayerRegistration';
import BotRegistration from '../Component/BotRegistration/BotRegistration';

import AUserDetails from '../Component/UserDetails/AUserDetails/AUserDetails';
import ABotDetails from '../Component/UserDetails/ABotDetails/ABotDetails';

import SocialURL from '../Component/SocialURL/SocialURL';
import NoticeText from '../Component/NoticeText/NoticeText';
import Mentenance from '../Component/Mentenance/Mentenance';
import Notification from '../Component/Notification/Notification';
import Banner from '../Component/Banner/Banner';
import Settings from '../Component/Settings/Settings';

const Dashbord = () => {
    return (
        <Router>
            <div>
               
                    <div className={styles.layout}>
                        <div className={styles.left}>
                            <Sidebar />
                        </div>
                        <div className={styles.right}>
                        <Navbar />
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={<AdminPage />} />
                                <Route path="/adminpage" element={<AdminPage />} />
                                <Route path="/playermanagement" element={<PlayerManagement />} />
                                <Route path="/agentmanagement" element={<AgentManagement />} />
                                <Route path="/agentregistration" element={<AgentRegistration />} />
                                <Route path="/agentDetails" element={<AgentDetails />} />


                                <Route path="/shopmanagement" element={<ShopManagement />} />
                                <Route path="/shopregistration" element={<ShopRegistration />} />
                                <Route path="/shopDetails" element={<ShopDetails />} />


                                <Route path="/botmanagement" element={<BotManagement />} />
                                <Route path="/setgamelogic" element={<SetGameLogic />} />
                                <Route path="/gamehistory" element={<GameHistory />} />
                                <Route path="/playerregistration" element={<PlayerRegistration />} />
                                <Route path="/aUserDetails" element={<AUserDetails />} />
                                <Route path="/socialURL" element={<SocialURL />} />
                                <Route path="/noticeText" element={<NoticeText />} />
                                <Route path="/mentenance" element={<Mentenance />} />
                                <Route path="/notification" element={<Notification />} />
                                <Route path="/banner" element={<Banner />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/aBotDetails" element={<ABotDetails />} />
                                <Route path="/botregistration" element={<BotRegistration />} />

                                

                             
                            </Routes>
                        </div>
                    </div>
             
               
            </div>
        </Router>
    )
}

export default Dashbord