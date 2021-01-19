const express = require('express');
const request = require('request');
const app = express();

var loop_Timer;
var KEY_AUTH = "tjLNCr5qLSdMgdfV7Z1gMNFWnRROAf36gUohbeEcIUo";
var trad_in = 0;
var trad_out = 0;

app.get('/eth-start', (req, res) => {
    loop_Timer = setInterval(function () {

        let sDate = new Date();
        let eDate = new Date();
        eDate.setMinutes(eDate.getMinutes() + 1)
        let time = Math.floor((sDate.getTime() / 1000)) + "&to=" + Math.floor((eDate.getTime() / 1000));

        request({
            method: 'GET',
            uri: "https://tradingview.bitkub.com/tradingview/history?symbol=ETH_THB&resolution=1&from=1610962292&to=1610962892"
        }, (err, httpResponse, bodys) => {
            if (err) {
                console.log(err)
                clearInterval(loop_Timer);
            } else {
                // STATUS 200
                let result = checkPrice(bodys);
                lineNotify(result, KEY_AUTH)
                res.end('START notify-api');
            }
        });
    }, 5000);
});

function checkPrice(bodys) {
    let datas = JSON.parse(bodys);
    // let price = datas.c[0];
    let price = 40000;
    let text = "";
    //จุดเข้า
    if(price <= trad_in){
        text += "ราคา ETH \nTHB ฿30,000\nUSD $1,000"
    }
    
    // if (price > 30000) {
    //     return "ราคา ETH \nTHB ฿30,000\nUSD $1,000";
    // } else if (price > 31000) {
    //     return "ราคา ETH \nTHB ฿31,000\nUSD $1,000";
    // }
}

function lineNotify(message = "", KEY_AUTH) {
    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            bearer: KEY_AUTH,
        },
        form: {
            message: message,
        },
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err);
            clearInterval(loop_Timer);
        } else {
            return body;
        }
    });
}

app.get('/eth-stop', (req, res) => {
    clearInterval(loop_Timer);
    res.end('STOP notify-api');
});

module.exports = app;