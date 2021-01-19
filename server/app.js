const express = require('express');
const request = require('request');
const app = express();
app.use(express.json());

var loop_Timer;
var KEY_AUTH = "tjLNCr5qLSdMgdfV7Z1gMNFWnRROAf36gUohbeEcIUo";
var trad_in = 38000;
var trad_out = 35000;

app.get('/api/alert-start', (req, res) => {
    let { timer = 5000, symbol = 'ETH_THB', timeFrame = 1 } = req.body;

    // loop_Timer = setInterval(function () {
    let sDate = new Date();
    let eDate = new Date();
    eDate.setMinutes(eDate.getMinutes() + 1)
    let time = Math.floor((sDate.getTime() / 1000)) + "&to=" + Math.floor((eDate.getTime() / 1000));
    let URI = "https://tradingview.bitkub.com/tradingview/history?symbol=" + symbol + "&resolution=" + timeFrame + "&from=1610962292&to=1610962892";
    console.log('URI', URI);
    request({
        method: 'GET',
        uri: URI
    }, (err, httpResponse, bodys) => {
        if (err) {
            console.log(err)
            clearInterval(loop_Timer);
        } else {
            let result = checkPrice(bodys);
            lineNotify(result, KEY_AUTH)
        }
    });
    // }, timer);
    console.log('alert-start');
});

function checkPrice(bodys) {
    let datas = JSON.parse(bodys);
    let price = datas.c[0];
    // let price = 29999;
    let text = "";

    //จุดเข้า
    if (price <= trad_in) {
        text += "\n*** เข้า ETH *** \nTHB ฿" + numberWithCommas(price) + "\nUSD $" + numberWithCommas((price / 30).toFixed(2))
    }
    //จุดออก
    // else if (price >= trad_out) {
    //     text += "\n*** ออก ETH *** \nTHB ฿" + numberWithCommas(price) + "\nUSD $" + numberWithCommas((price / 30).toFixed(2))
    // }
    // text += "\n\nvar trad_in = 38000;\ntimer = 5000";
    return text
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

app.get('/alert-stop', (req, res) => {
    clearInterval(loop_Timer);
    console.log('alert-start');
    res.end('alert-start');
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = app;