import React, { useState,useContext,useEffect } from 'react'
import styles from './Mentenance.module.css';
import offerContext from '../../context/offerContext'


const Mentenance = () => {
    const [mode, setMode] = useState(false)
    

    const context = useContext(offerContext)
    console.log("Contect ",context)
    const { GetMentenance,MentenanceUpdate } = context
    
    const [version, setversion] = useState("")

    useEffect( () => {
        const submitdata = async () => {
    
            let mantainceInfo = await GetMentenance()
            setversion(mantainceInfo.version)
            setMode(mantainceInfo.mentenance)
      }
    
      submitdata()
      },[]);

      const changeMode = async () => {
        setMode(!mode)
       
        await MentenanceUpdate(!mode)

    }
    return (
        <div className={styles.mentenancelLayout}>
            <h1>Mentenance</h1>
            <div className={styles.mentenancelbox1} >
                <div className={styles.mentenancelbox1Line1}>
                    <div>Game Version</div>
                    <div>{version}</div>
                </div>
                <div className={styles.mentenancelbox1Line1}>
                    <div>Mentenance mode</div>
                    <div className={mode ? styles.mentenancelbox2buttontrue : styles.mentenancelbox2buttonfalse} onClick={changeMode}>
                        {mode ? "Yes" : "No"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mentenance