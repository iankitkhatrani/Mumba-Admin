import React, { useState,useContext,useEffect } from 'react';
import styles from './Notification.module.css';
import offerContext from '../../context/offerContext'

const Notification = () => {
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');

  const handleTitleChange = (e) => {
    setNotificationTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNotificationDescription(e.target.value);
  };

  const context = useContext(offerContext)
  console.log("Contect ",context)
  const { SendPushnotification } = context
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // You can add your logic here to handle the form submission
    const res =  await SendPushnotification({notificationTitle,notificationDescription})

    res.falgs ? alert("Successfully Sent Push notification....") : alert("Fail to Push notification....")
    console.log('Title:', res);
    console.log('Description:', notificationDescription);
    setNotificationTitle("")
    setNotificationDescription("")

  };

  
  

  return (
    <div className={styles.notificationPage}>
      <h2>Notification Page</h2>
      <form className={styles.notificationForm} onSubmit={handleSubmit}>
        <label className={styles.inputlabel}>Notification Title*</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Notification Title"
          value={notificationTitle}
          onChange={handleTitleChange}
          required
        />
        <label className={styles.inputlabel}>Notification Description*</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Notification Description"
          value={notificationDescription}
          onChange={handleDescriptionChange}
          required
        />
        <button className={styles.formSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Notification;
