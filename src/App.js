import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';

export default function App() {
  let sDate = new Date();
  let eDate = new Date();
  eDate.setMinutes(eDate.getMinutes() + 1)
  let time = Math.floor((sDate.getTime()/1000)) + "&to=" + Math.floor((eDate.getTime()/1000));
  console.log('time', time)

  useEffect(() => {
    axios.get("https://tradingview.bitkub.com/tradingview/history?symbol=ETH_THB&resolution=1&from=" + time)
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {

      });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src="images/logo2.png" className="App-logo" alt="logo" />
        <p>MangMao Alert 1.0 by Imposter group</p>
      </header>
    </div>
  )
}
