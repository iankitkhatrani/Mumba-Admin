import React, {useState, useContext,useEffect } from 'react'
import styles from './ShopDetails.module.css';
import { useNavigate,useLocation } from 'react-router-dom';
import offerContext from '../../context/offerContext'

const ShopDetails = () => {

    const location = useLocation();
    console.log("location ", location)
    const userID = location.state;
    console.log("state ", userID)

    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts 
        navigate('/shopmanagement');
    };

    const context = useContext(offerContext)
    const { ShopData,ShopUpdate,UploadProfile,host } = context
    let [userInfo,SetuserInfo] = useState({
        userId:userID,
        email: "",
        name: "",
        mobileno: "",
        password: "",
        location:"",
        area:"",
        status:""
    })

    useEffect(() => {
        
        const submitdata = async () => {
            let botData = await ShopData(userID)
            console.log("User Effect :::::::::::::::::::::::::",botData)
            SetuserInfo({
                userId:userID,
                email: botData.email || "",
                name: botData.name || "",
                mobileno: botData.mobileno || "",
                password: botData.password || "",
                location:botData.location || "",
                area:botData.area || "",
                status:botData.status || ""
            })
            
        }
        submitdata()
    }, []);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
            console.log("NAME :::::::::::::::::",value)
        SetuserInfo({
            ...userInfo,
            [name]: value,
        });


        console.log("handleChange ::::::::::::::::::::::",userInfo)

    };

    const OnChange = async (event) => {
        let { name, value } = event.target;
        console.log("name ",name)
        console.log("name ",value)

        await SetuserInfo({
            ...userInfo,
            [name]: value,
        });

        console.log("handleChange ::::::::::::::::::::::",userInfo)
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // You can handle the form submission here
        // This example just logs the data to the console

        console.log("userInfo ",userInfo)

        let res = await ShopUpdate(userInfo)

        console.log("REsponce ::::::::::::::::::::::",res)

        if(res.status == "ok"){
            navigateToContacts()
        }else{
            alert("Error Please enter")
        }

        console.log(userInfo);

       

    };


    return (
        <>
            
        <div className={styles.registrationForm}>
        <div className={styles.PlayerRegistration}>
            <div className={styles.p}>
                * Field are required
            </div>
        </div>
        <form onSubmit={handleSubmit}>
                    
            <div className={styles.rowwise}>
                <div className={styles.inputGroup}>
                    <label htmlFor="AgentName">Agent Name</label>
                    <input
                        placeholder="Enter Agent Name"
                        type="text"
                        name="name"
                        id="name"
                        value={userInfo.name}
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
                        
                        value={userInfo.email}
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
                        value={userInfo.mobileno}
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
                        value={userInfo.password}
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
                        value={userInfo.location}
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
                        value={userInfo.area}
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
                    checked={userInfo.status === "active"}
                    onChange={OnChange}
                    />
                    Active
                </label>
                <label>
                    <input
                    type="radio"
                    value="inactive"
                    name="status"
                    checked={userInfo.status === "inactive" || userInfo.status === ""}
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
    )
}

export default ShopDetails