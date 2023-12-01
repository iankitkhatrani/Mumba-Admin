// NoticeText.js

import React, { useState,useContext,useEffect } from 'react';
import styles from './NoticeText.module.css';
import offerContext from '../../context/offerContext'

function NoticeText() {
  const [notices, setNotices] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const context = useContext(offerContext)
  console.log("Contect ",context)
  const { NoticeTextList,NoticeTextLsAdd,DeleteNoticeText } = context
  
  useEffect( () => {
    const submitdata = async () => {
      setNotices(await NoticeTextList())
    }
  submitdata()
  },[]);

  const addNotice = async () => {
    if (newTitle && newContent) {
      const newNotice = {
        id: notices.length + 1,
        title: newTitle,
        content: newContent,
        date: new Date().toLocaleDateString(),
      };

      let res = await NoticeTextLsAdd(newNotice)
      console.log("REsponce ::::::::::::::::::::::",res)

      if(res.flags){
        setNotices([...notices, res.data]);
        setNewTitle('');
        setNewContent('');
      }else{
          alert("Error Please enter")
      }


      
    }
  };

  const deleteNotice = async (id) => {
    const updatedNotices = notices.filter((notice) => notice._id !== id);
    await DeleteNoticeText(id)

    setNotices(updatedNotices);
  };

  return (
    <div className={styles.noticeTextContainer}>
      <div className={styles.addNoticeContainer}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={styles.inputField}
        />
        <textarea
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className={styles.textArea}
        />
        <button onClick={addNotice} className={styles.addButton}>
          Add Notice
        </button>
      </div>
      <h2 className={styles.noticeTextTitle}>Gaming Dashboard Notices</h2>
      <div className={styles.noticeList}>
        {notices.map((notice) => (
          <div key={notice.id} className={styles.noticeItem}>
            <h3 className={styles.noticeTitle}>{notice.title}</h3>
            <p className={styles.noticeContent}>{notice.content}</p>
            <p className={styles.noticeDate}>Posted on: {notice.createdAt}</p>
            <button
              className={styles.deleteButton}
              onClick={() => deleteNotice(notice._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticeText;
