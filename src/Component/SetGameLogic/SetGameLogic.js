import React, { useState,useContext,useEffect } from 'react';
import styles from './SetGameLogic.module.css';
import { useLocation } from 'react-router-dom';
import offerContext from '../../context/offerContext'

const SetGameLogic = () => {
  const [selectedMode, setSelectedMode] = useState('No One Will Win');

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  let location = useLocation();
  let gameName = location.search.split("=")[1]
  console.log("Location ",location,gameName)

  const context = useContext(offerContext)
  console.log("Contect ",context)
  const { GameLogicSet } = context


  const handleSubmit = async () => {
   let res = await  GameLogicSet({
        "game":gameName,
        "gamelogic":selectedMode
    })
    console.log("REs :::::::::::::::::::::",res)
    if(res.falgs == true){
      alert("Success Save")
    }
    console.log(selectedMode);
  };


  
  

  return (
    <div className={styles.container}>
      <h2>Set Game Logic:</h2>
      <div className={styles.radioGroup}>
        <div className={styles.radioOption}>
          <input
            type="radio"
            id="noOneWillWin"
            name="gameMode"
            value="No One Will Win"
            checked={selectedMode === 'No One Will Win'}
            onChange={handleModeChange}
          />
          <label htmlFor="noOneWillWin">No One Will Win</label>
        </div>
        <div className={styles.radioOption}>
          <input
            type="radio"
            id="leastAmountWillWin"
            name="gameMode"
            value="Least Amount Will Win"
            checked={selectedMode === 'Least Amount Will Win'}
            onChange={handleModeChange}
          />
          <label htmlFor="leastAmountWillWin">Least Amount Will Win</label>
        </div>
        <div className={styles.radioOption}>
          <input
            type="radio"
            id="randomNumberWillWin"
            name="gameMode"
            value="Random Number Will Win"
            checked={selectedMode === 'Random Number Will Win'}
            onChange={handleModeChange}
          />
          <label htmlFor="randomNumberWillWin">Random Number Will Win</label>
        </div>
      </div>
      <button className={styles.submitButton} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SetGameLogic;
