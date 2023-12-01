import React, { useState } from 'react';
import styles from './Settings.module.css'; // Import your CSS module

function Settings() {
  const [formData, setFormData] = useState({
    siteTitle: '',
    companyName: '',
    email: '',
    place: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    // Handle file upload
    const file = e.target.files[0];
    // You can handle the file here, e.g., save it to the server or display a preview.
  };

  return (
    <div className={styles.settingsPage}>
      <h2>Settings</h2>
      <form className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="siteTitle">Site Title</label>
            <input
              type="text"
              id="siteTitle"
              name="siteTitle"
              placeholder='Site Title'
              value={formData.siteTitle}
              onChange={handleInputChange}
              
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email1">Email1</label>
            <input
              type="text"
              id="email1"
              name="email1"
              value={formData.email1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="email2">Email2</label>
            <input
              type="text"
              id="email2"
              name="email2"
              value={formData.email2}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Phone*</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="version">Version*</label>
            <input
              type="text"
              id="version"
              name="version"
              value={formData.version}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="contactUs">Contact Us</label>
            <input
              type="text"
              id="contactUs"
              name="contactUs"
              value={formData.contactUs}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="copyRight">Copy Right*</label>
            <input
              type="text"
              id="copyRight"
              name="copyRight"
              value={formData.copyRight}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="website">Website*</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="topPlayerLimit">Top player Limit*</label>
            <input
              type="text"
              id="topPlayerLimit"
              name="topPlayerLimit"
              value={formData.topPlayerLimit}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="referalField1">referalField1*</label>
            <input
              type="text"
              id="referalField1"
              name="referalField1"
              value={formData.referalField1}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="referalField2">referalField2*</label>
            <input
              type="text"
              id="referalField2"
              name="referalField2"
              value={formData.referalField2}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="referalField3">referalField3*</label>
            <input
              type="text"
              id="referalField3"
              name="referalField3"
              value={formData.referalField3}
              onChange={handleInputChange}
            />
          </div>
        </div>




        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="adminPercentage">Admin Percentage for user Redeme*</label>
            <input
              type="text"
              id="adminPercentage"
              name="adminPercentage"
              value={formData.adminPercentage}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="baseUrl">Base Url*</label>
            <input
              type="text"
              id="baseUrl"
              name="baseUrl"
              value={formData.baseUrl}
              onChange={handleInputChange}
            />
          </div>
        </div> <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="minimumDeposite">Minimum Deposite*</label>
            <input
              type="text"
              id="minimumDeposite"
              name="minimumDeposite"
              value={formData.minimumDeposite}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="minimumWithdrow">Minimum Withdrow*</label>
            <input
              type="text"
              id="minimumWithdrow"
              name="minimumWithdrow"
              value={formData.minimumWithdrow}
              onChange={handleInputChange}
            />
          </div>
        </div> <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="spinWheelTime">spin Wheel Time*</label>
            <input
              type="text"
              id="spinWheelTime"
              name="spinWheelTime"
              value={formData.spinWheelTime}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="referalField3">referalField3*</label>
            <input
              type="text"
              id="referalField3"
              name="referalField3"
              value={formData.referalField3}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.fileInput}>
          <label htmlFor="logo">APK</label>
          <input
            type="file"
            id="apkFile"
            accept=".apk"
            onChange={handleFileChange}
            className={styles.apk}
          />
        </div>
        <button className={styles.saveButton}>Save</button>
      </form>
    </div>
  );
}

export default Settings;
