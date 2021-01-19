import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';

export default function App() {

  const [startAPI, setStartAPI] = useState({
    timer: 5000,
    symbol: 'ETH_THB',
    timeFrame: 1
  })

  useEffect(() => {
    alertStart();
  }, []);

  const alertStart = () => {
    axios.post("http://localhost:3003/api/alert-start", startAPI)
      .then(function (res) {
        console.log(res.data);

      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {

      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="images/logo2.png" className="App-logo" alt="logo" />
        <p>MangMao Alert 1.0 by Imposter group</p>
        <input type="text"/>
        <input type="text"/>
        <input type="text"/>
      </header>
    </div>
  )
}
