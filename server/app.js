const express = require('express');
const request = require('request');
const app = express();

var myTimer;

app.get('/eth-start', (req, res) => {
    let sDate = new Date();
    let eDate = new Date();
    eDate.setMinutes(eDate.getMinutes() + 1)
    let time = Math.floor((sDate.getTime() / 1000)) + "&to=" + Math.floor((eDate.getTime() / 1000));
    myTimer = setInterval(function () {
        request({
            method: 'GET',
            uri: "https://tradingview.bitkub.com/tradingview/history?symbol=ETH_THB&resolution=1&from=" + time
        }, (err, httpResponse, bodys) => {
            if (err) {
                console.log(err)
            } else {
                request({
                    method: 'POST',
                    uri: 'https://notify-api.line.me/api/notify',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    auth: {
                        bearer: 'tjLNCr5qLSdMgdfV7Z1gMNFWnRROAf36gUohbeEcIUo',
                    },
                    form: {
                        message: bodys,
                    },
                }, (err, httpResponse, body) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.end('START notify-api');
                    }
                });
            }
        });
    }, 60000);
});

app.get('/eth-stop', (req, res) => {
    clearInterval(myTimer);
    res.end('STOP notify-api');
});

module.exports = app;