import React, { useState,useContext } from 'react';
import styles from './ShopRegistration.module.css';
import offerContext from '../../context/offerContext'
import { useNavigate } from 'react-router-dom';

function ShopRegistration() {

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        mobileno: "",
        password: "",
        location:"",
        agentId:"",
        area:"",
        status:""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const OnChange = async (event) => {
        let { name, value } = event.target;
        console.log("name ",name)
        console.log("name ",value)

        await setFormData({
            ...formData,
            [name]: value,
        });

        console.log("handleChange ::::::::::::::::::::::",formData)
    };
    
    const context = useContext(offerContext)
    const { ShopAdd } = context

    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts 
        navigate('/shopmanagement');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // You can handle the form submission here
        // This example just logs the data to the console
        console.log("Add GUEST ",formData)
        let res = await ShopAdd(formData)
        
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
                    <h2>Shop Registration</h2>
                </div>
                <div className={styles.p}>
                    * Field are required
                </div>
            </div>
                <form onSubmit={handleSubmit}>
                    
                    <div className={styles.rowwise}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="ShopName">Shop Name</label>
                            <input
                                placeholder="Enter Shop Name"
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
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
                            <label htmlFor="mobileno">Mobile Number</label>
                            <input
                                placeholder="Enter User Name"
                                type="text"
                                name="mobileno"
                                id="mobileno"
                                value={formData.mobileno}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder="Enter Password"
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.rowwise}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="location">location</label>
                            <input
                                placeholder="Enter location"
                                type="text"
                                name="location"
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="area">Area</label>
                            <input
                                placeholder="Enter area"
                                type="text"
                                name="area"
                                id="area"
                                value={formData.area}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>


                        <div className={styles.rowwise}>
                    
                            <label htmlFor="Status">Status *</label>
                            <label>
                                <input
                                type="radio"
                                value="active"
                                name="status"
                                checked={formData.status === "active"}
                                onChange={OnChange}
                                />
                                Active
                            </label>
                            <label>
                                <input
                                type="radio"
                                value="inactive"
                                name="status"
                                checked={formData.status === "inactive" || formData.status === ""}
                                onChange={OnChange}
                                />
                                Inactive
                            </label>
                     
                        <div>
                    </div>
                </div>


                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default ShopRegistration;
