// SocialURL.js

import React,  { useState,useContext,useEffect } from 'react';
import styles from './SocialURL.module.css';
import offerContext from '../../context/offerContext'


function SocialURL() {
  const [socialURLs, setSocialURLs] = useState([]);
  const context = useContext(offerContext)
  console.log("Contect ",context)
  const { SocailURLsList,SocailURLsAdd,DeleteSocailURLs } = context
  
  useEffect( () => {
    const submitdata = async () => {
    
      setSocialURLs(await SocailURLsList())

  }

  submitdata()
  },[]);


  const [newPlatform, setNewPlatform] = useState('');
  const [newURL, setNewURL] = useState('');

  const addSocialURL = async () => {
    if (newPlatform && newURL) {
      const newSocialURL = {
        id: socialURLs.length + 1,
        platform: newPlatform,
        url: newURL,
      };

      let res = await SocailURLsAdd(newSocialURL)
      console.log("REsponce ::::::::::::::::::::::",res)

      if(res.flags){
          setSocialURLs([...socialURLs, res.data]);
          setNewPlatform('');
          setNewURL('');
      }else{
          alert("Error Please enter")
      }
    }
  };

  const deleteSocialURL =async (id) => {
    const updatedSocialURLs = socialURLs.filter((url) => url._id !== id);
    await DeleteSocailURLs(id)
    setSocialURLs(updatedSocialURLs);
  };

  return (
    <div className={styles.socialURLContainer}>
      <div className={styles.addSocialURLContainer}>
        <input
          type="text"
          placeholder="Platform"
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="URL"
          value={newURL}
          onChange={(e) => setNewURL(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={addSocialURL} className={styles.addButton}>
          Add Social URL
        </button>
      </div>
      <h2 className={styles.socialURLTitle}>Social Media URLs</h2>
      <div className={styles.socialURLList}>
        {socialURLs.map((url) => (
          <div key={url.id} className={styles.socialURLItem}>
            <h3 className={styles.socialPlatform}>{url.platform}</h3>
            <a href={url.url} target="_blank" rel="noopener noreferrer" className={styles.socialURL}>
              {url.url}
            </a>
            <button
              className={styles.deleteButton}
              onClick={() => deleteSocialURL(url._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialURL;
