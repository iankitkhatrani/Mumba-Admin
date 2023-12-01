import React , { useState,useContext } from 'react';
import styles from './UserInfo.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import offerContext from '../../../context/offerContext'

function UserInfo(props) {
    console.log("poroper s ",props)
 
    const [show, setShow] = useState(false);
    const [showdeduct, setShowdeduct] = useState(false);


    const context = useContext(offerContext)
    const { AddMoney,DeductMoney } = context


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [amount, setAmount] = useState(0);
    const [type, setType] = useState("");


    const handleAmount = async (event) =>{
        const { name, value } = event.target;
        await setAmount(value)

        console.log("amount",amount)

    }   

    const handleType = async (event) =>{
        const { name, value } = event.target;
        console.log("event.target ",event.target.value)
        await setType(value)
    }   


    const SaveChange = async () =>{
        console.log("amount ",amount)
        console.log("type ",type)

        let res = await AddMoney({money:amount,type:type,userId:props.userInfo._id})
        
        if(res.status == "ok"){
            setShow(false)
            alert("Successfully Added...!!")
        }else{
            alert("Error Please enter")
        }

        setAmount(0)
        setType("")


    }   

    const handleCloseDeduct = () => setShowdeduct(false);
    const handleShowDeduct = () => setShowdeduct(true);
    

    const SaveChangeDeduct = async () =>{
        console.log("amount ",amount)
        console.log("type ",type)

        let res = await DeductMoney({money:amount,type:type,userId:props.userInfo._id})
        
        if(res.status == "ok"){
            setShowdeduct(false)
            alert("Successfully Deduct...!!")
        }else{
            alert("Error Please enter")
        }

        setAmount(0)
        setType("")

    }   

    const userData = props.userInfo != undefined ? {
        "name": props.userInfo.username || "" ,
        "userImage": props.userInfo.profileUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxaLo41DVakt-xR_SckaYvH_YNUWVR6S6yTOqV_dt&s",
        "mobileNumber": props.userInfo.mobileNumber,
        "userName": props.userInfo.username || "John Doe",
        "id": props.userInfo.id,
        "email": props.userInfo.email,
        "status": props.userInfo.status == "" ? "DeActive" : "Active",
        "mainWallet": props.userInfo.chips,
        "referralUsers": props.userInfo.referralCode,
        "coupons": 5,
        "deviceName":props.userInfo.deviceType,
        "deviceModel":props.userInfo.deviceModel || "23psfg",
        "OS":props.userInfo.OS || "Window",
        "RAM":props.userInfo.RAM || "16gb",
        "Processor":props.userInfo.Processor || "16gb"
    } : {
        "name": "SatishKumar",
        "userImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxaLo41DVakt-xR_SckaYvH_YNUWVR6S6yTOqV_dt&s",
        "mobileNumber": "123-456-7890",
        "userName": "John Doe",
        "id": "12345",
        "email": "johndoe@example.com",
        "status": "Active",
        "mainWallet": "$1000",
        "referralUsers": 10,
        "coupons": 5,
        "deviceName":"vivoz1 pro",
        "deviceModel":"23psfg",
        "OS":"Window",
        "RAM":"16gb",
        "Processor":"OctaCode777"
    }


    return (
        <>
            <div className={styles.userInfo}>
                <div className={styles.userInfoTop} >
                    <div className={styles.userImage}>
                        <img src={userData.userImage} alt="User" />
                    </div>
                    <div className={styles.nameInfo}>{userData.name}</div>
                    <div className={styles.userinfoall}>Username: {userData.userName}</div>
                    <div className={styles.userinfoall}>ID: {userData.id}</div>
                    <div className={styles.userinfoall}>{userData.email}</div>

                </div>
                <div className={styles.userInfoDetails}>
                    <div className={styles.userInfoRow}>
                        <div className={styles.infoLabel}>Mobile</div>
                        <div className={styles.infoValue}>{userData.mobileNumber}</div>
                    </div>
                    <div className={styles.statusUserInfoRow}>
                        <div className={styles.infoLabel}>Status</div>
                        <div className={styles.statusinfoValue}>{userData.status}</div>
                    </div>
                    <div className={styles.userInfoRow}>
                        <div className={styles.infoLabel}>Main Wallet</div>
                        <div className={styles.infoValue}>{userData.mainWallet}</div>
                    </div>
                    <div className={styles.ReferraluserInfoRow}>
                        <div className={styles.infoLabel}>Referral Users</div>
                        <div className={styles.ReferralinfoValue}>{userData.referralUsers}</div>
                    </div>

                    <div className={styles.CouponsuserInfoRow}>
                        <div className={styles.infoLabel}>Coupons</div>
                        <div className={styles.CouponsinfoValue}>{userData.coupons}</div>
                    </div>

                    <div className={styles.userInfoActions}>
                        <button className={styles.AddactionButton}  onClick={handleShow} >Add Money</button>
                        <button className={styles.DeductactionButton} onClick={handleShowDeduct}>Deduct Money</button>
                        <button className={styles.kycButton}>KYC Info</button>
                    </div>
                </div>
                <div className={styles.DeviceInfo}>
                    <div className={styles.DeviceDeviceInfo}>Device Info</div>
                    
                    <div className={styles.DeviceInfobody}>
                        <div className={styles.DeviceInfKey}>Device Name</div>
                        <div className={styles.DeviceInfoValue}>{userData.deviceName}</div>
                    </div>
                    <div className={styles.DeviceInfobody}>
                        <div className={styles.DeviceInfKey}>Device Model</div>
                        <div className={styles.DeviceInfoValue}>{userData.deviceModel}</div>
                    </div>
                    <div className={styles.DeviceInfobody}>
                        <div className={styles.DeviceInfKey}>OS</div>
                        <div className={styles.DeviceInfoValue}>{userData.OS}</div>
                    </div>
                    <div className={styles.DeviceInfobody}>
                        <div className={styles.DeviceInfKey}>RAM</div>
                        <div className={styles.DeviceInfoValue}>{userData.RAM}</div>
                    </div>
                    <div className={styles.DeviceInfobody}>
                        <div className={styles.DeviceInfKey}>Processor</div>
                        <div className={styles.DeviceInfoValue}>{userData.Processor}</div>
                    </div>
                </div>
            </div>

         

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Money</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Amount"
                    className="mb-3"
                >
                <Form.Control type="number" placeholder="0"  onChange={handleAmount} />
              </FloatingLabel>


                <Form.Select aria-label="Default select example" onChange={handleType}>
                    <option value="">Transaction Mode</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Refund">Refund</option>
                </Form.Select>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={SaveChange}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showdeduct} onHide={handleCloseDeduct}>
                <Modal.Header closeButton>
                <Modal.Title>Deduct Money</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Amount"
                    className="mb-3"
                >
                <Form.Control type="number" placeholder="0"  onChange={handleAmount} />
              </FloatingLabel>


                <Form.Select aria-label="Default select example" onChange={handleType}>
                    <option value="">Transaction Mode</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Refund">Refund</option>
                </Form.Select>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeduct}>
                    Close
                </Button>
                <Button variant="primary" onClick={SaveChangeDeduct}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserInfo;
