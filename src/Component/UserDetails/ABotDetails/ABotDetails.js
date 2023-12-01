import React, {useState, useContext,useEffect } from 'react'
import styles from './ABotDetails.module.css';
import { useNavigate,useLocation } from 'react-router-dom';
import offerContext from '../../../context/offerContext'

const ABotDetails = () => {

    const location = useLocation();
    console.log("location ", location)
    const userID = location.state;
    console.log("state ", userID)

    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts 
        navigate('/botmanagement');
    };

    

    const context = useContext(offerContext)
    const { BotData,BotUpdate,UploadProfile,host } = context
    let [userInfo,SetuserInfo] = useState({
        userId:userID,
        country: 'India',
        name: '',
        profileUrl:'',
        status:true
    })

    useEffect(() => {
        
        const submitdata = async () => {
            let botData = await BotData(userID)
            console.log("User Effect :::::::::::::::::::::::::",botData)
            SetuserInfo({
                userId:userID,
                country: botData.country || "",
                name: botData.name || "",
                profileUrl: botData.profileUrl || "",
                status: botData.status || true
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

    const OnChange = (event) => {
        let { name, value } = event.target;
        value = (value?.toLowerCase?.() === 'true')?true:false
        SetuserInfo({
            ...userInfo,
            [name]: value,
        });
        console.log("handleChange ::::::::::::::::::::::",userInfo)
    };

    

    const handleImage = async (e) =>{
        console.log("Upload image ",e.target.files[0])
        //this.setState({image_url:e.target.files[0]})
        const value = await UploadProfile(e.target.files[0])

         SetuserInfo({
            ...userInfo,
            [e.target.name]: value,
        });

        console.log("userInfo handleImage KKKKKKKKKKKKKKKKKKKKKKKKKKK",userInfo)

    }

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        // You can handle the form submission here
        // This example just logs the data to the console

        console.log("userInfo ",userInfo)

        let res = await BotUpdate(userInfo)

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
            <div className={styles.d}>
                <h2>Bot Update</h2>
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
                            value={userInfo.name}
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="country">Country Name *</label>
                        <input
                            placeholder="India"
                            type="country"
                            name="country"
                            id="country"
                            value={userInfo.country}
                            onChange={handleChange}
                            
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
                            
                        />

                    </div>
                    <div className={styles.inputGroup}>
                    <img className={styles.ImageTag}  src={host+"/"+userInfo.profileUrl} />
                    </div>
                </div>


                
                <div className={styles.rowwise}>
                    
                    <div>
                    <label htmlFor="Status">Status *</label>
                    <label>
                        <input
                        type="radio"
                        value={true}
                        name="status"
                        checked={userInfo.status === true || userInfo.status === "true"}
                        onChange={OnChange}
                        />
                        Active
                    </label>
                    <label>
                        <input
                        type="radio"
                        value={false}
                        name="status"
                        checked={userInfo.status === false || userInfo.status === "false" || userInfo.status === ""}
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
    )
}

export default ABotDetails