import React, { useState,useContext } from 'react';
import styles from './PlayerRegistration.module.css';
import offerContext from '../../context/offerContext'
import { useNavigate } from 'react-router-dom';

function PlayerRegistration() {

    const [formData, setFormData] = useState({
        retailer: '',
        country: 'India',
        playerName: '',
        email: '',
        username: '',
        mobileNumber: '',
        password: '',
        deviceId:'111',
        isVIP:1,
        Iscom:0
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const context = useContext(offerContext)
    const { PlayerAdd } = context

    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts 
        navigate('/playermanagement');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // You can handle the form submission here
        // This example just logs the data to the console
        let res = await PlayerAdd(formData)
        
        if(res.status == 200){
            navigateToContacts()
        }else{
            alert("Error Please enter")
        }

        console.log(formData);

       

    };

    return (
        <>
            
            <div className={styles.registrationForm}>
            <div className={styles.PlayerRegistration}>
                <div className={styles.d}>
                    <h2>"Player Registration"</h2>
                </div>
                <div className={styles.p}>
                    * Field are required
                </div>
            </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.rowwise}>
                        {/*<div className={styles.inputGroup}>
                            <label htmlFor="retailer">Retailer</label>
                            <select
                                name="retailer"
                                id="retailer"
                                value={formData.retailer}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Retailer</option>
                                <option value="Retailer1">Retailer 1</option>
                                <option value="Retailer2">Retailer 2</option>
                                 //Add more retailer options 
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="country">Country*</label>
                            <input
                                placeholder="India"
                                type="text"
                                name="country"
                                id="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        */}
                    </div>
                    
                    <div className={styles.rowwise}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="playerName">Player Name</label>
                            <input
                                placeholder="Enter Player Name"
                                type="text"
                                name="playerName"
                                id="playerName"
                                value={formData.playerName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="xyz@gmail.com"
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.rowwise}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">Username</label>
                            <input
                                placeholder="Enter User Name"
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="mobileNumber">Mobile</label>
                            <input
                                placeholder="Enter Mobile Number"
                                type="tel"
                                name="mobileNumber"
                                id="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.rowwise}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder="Enter Strong Password"
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default PlayerRegistration;
