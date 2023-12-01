import React, {useContext,useEffect, useState } from 'react';
import styles from './Banner.module.css';
import offerContext from '../../context/offerContext'

function Banner() {
  const [banners, setBanners] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const context = useContext(offerContext)
  console.log("Contect ",context)
  const { BannerList,BannerAdd,DeleteBanner,UploadBanner,host } = context
  
    
  useEffect( () => {
    const submitdata = async () => {
      console.log("aaaaaaaaaaa")
      setBanners(await BannerList())


  }

  submitdata()
  },[]);


  const addNotice = async () => {
    if (newTitle && selectedImage) {
      const newBanner = {
        id: banners.length + 1,
        title: newTitle,
        imageUrl: selectedImage,//URL.createObjectURL(selectedImage), // Display the selected image
        date: new Date().toLocaleDateString(),
      };

      let res = await BannerAdd(newBanner)
      console.log("REsponce ::::::::::::::::::::::",res)

      if(res.flags){
          

          setBanners([...banners, res.data]);
          setNewTitle('');
          setSelectedImage(null);
      }else{
          alert("Error Please enter")
      }
    }
  };

  const deleteBanner = async (id) => {
    const updatedNotices = banners.filter((notice) => notice._id !== id);
    await DeleteBanner(id)
    setBanners(updatedNotices);
  };

  const handleImageChange = async (e) => {
    console.log("e")
   

    const imageFile = await UploadBanner(e.target.files[0])

    console.log("imageFile ",imageFile)
    if (imageFile) {
      setSelectedImage(imageFile);
    }
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.addNoticeContainer}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.imageInput}
        />
        <button onClick={addNotice} className={styles.addButton}>
          Add Banner
        </button>
      </div>
      <h2 className={styles.noticeTextTitle}>Gaming Dashboard Banners</h2>
      <div className={styles.noticeList}>

        {banners.map((notice) => (
          <div key={notice._id} className={styles.noticeItem}>
            
            {notice.imageUrl && (
              <img src={notice.imageUrl.includes('upload') ? host+"/"+notice.imageUrl : notice.imageUrl} alt="Banner" className={styles.noticeImage} />
            )}
            <h3 className={styles.noticeTitle}>{notice.title}</h3>
            <p className={styles.noticeDate}>Posted on: {notice.createdAt}</p>
            <button
              className={styles.deleteButton}
              onClick={() => deleteBanner(notice._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
