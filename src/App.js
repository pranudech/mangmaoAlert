import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';

export default function App() {
  let sDate = new Date();
  sDate.setMinutes(sDate.getMinutes() - 1)
  let eDate = new Date();
  let time = Math.floor((sDate.getTime() / 1000)) + "&to=" + Math.floor((eDate.getTime() / 1000));
  console.log('time', time)
  
  console.log(new Date(sDate))
  console.log(new Date(eDate))

  useEffect(() => {
    axios.get("https://tradingview.bitkub.com/tradingview/history?symbol=ETH_THB&resolution=1&from=1610962292&to=1610962892")
      .then(function (res) {
        console.log(res.data);
        console.log('res.data.c', res.data.c[0])
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {

      });

    // axios.get("http://localhost:3001/api/eth-start")
    //   .then(function (res) {
    //     console.log(res.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .then(function () {

    //   });
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
