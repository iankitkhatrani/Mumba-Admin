import React, { useState,useContext } from 'react';
import styles from './BotRegistration.module.css';
import offerContext from '../../context/offerContext'
import { useNavigate } from 'react-router-dom';

function BotRegistration() {

    const [formData, setFormData] = useState({
        retailer: '',
        country: 'India',
        name: '',
        email: '',
        username: '',
        mobileNumber: '',
        password: '',
        deviceId:'111',
        isVIP:0,
        Iscom:1,
        status:"true"
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const context = useContext(offerContext)
    const { BotAdd,UploadProfile,host} = context

    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts 
        navigate('/botmanagement');
    };


    const OnChange = (event) => {
        let { name, value } = event.target;

        value = (value?.toLowerCase?.() === 'true')?true:false

        setFormData({
            ...formData,
            [name]: value,
        });

        console.log("handleChange ::::::::::::::::::::::",formData)
    };

    

    const handleImage = async (e) =>{
        console.log("Upload image ",e.target.files[0])
        //this.setState({image_url:e.target.files[0]})
        const value = await UploadProfile(e.target.files[0])

        setFormData({
            ...formData,
            [e.target.name]: value,
        });

        console.log("userInfo handleImage KKKKKKKKKKKKKKKKKKKKKKKKKKK",formData)

    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        // You can handle the form submission here
        // This example just logs the data to the console
        let res = await BotAdd(formData)
        console.log("REsponce ::::::::::::::::::::::",res)
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
                    <h2>Bot Registration</h2>
                </div>
                <div className={styles.p}>
                    * Field are required
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                
                
                <div className={styles.rowwise}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Player Name *</label>
                        <input
                            placeholder="Enter Player Name"
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="country">Country Name *</label>
                        <input
                            placeholder="India"
                            type="country"
                            name="country"
                            id="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className={styles.rowwise}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="profileUrl">Profile Type *</label>
                        <input
                            placeholder="Select Profile"
                            type="file"
                            name="profileUrl"
                            id="profileUrl"
                            onChange={handleImage}
                            required
                        />

                    </div>
                    <div className={styles.inputGroup}>
                    <img className={styles.ImageTag}  src={host+"/"+formData.profileUrl} />
                    </div>
                </div>


                
                <div className={styles.rowwise}>
                    
                    <div>
                    <label htmlFor="Status">Status *</label>
                    <label>
                        <input
                        type="radio"
                        value={"true"}
                        name="status"
                        checked={formData.status === true}
                        onChange={OnChange}
                        />
                        Active
                    </label>
                    <label>
                        <input
                        type="radio"
                        value={"false"}
                        name="status"
                        checked={formData.status === false || formData.status === ""}
                        onChange={OnChange}
                        />
                        Inactive
                    </label>
                    </div>
                </div>

                <button type="submit">Submit</button>
            </form>
            </div>
        </>
    );
}

export default BotRegistration;
