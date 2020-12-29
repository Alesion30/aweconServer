// モジュール読み込み
const express = require("express");
const cors = require("cors");

// 環境変数ファイル(.env) 読み込み
require("dotenv").config();

// 外部ファイル 読み込み
const arduino = require("./arduino.js");
const action = require("./action.js");
const util = require("./util.js");
const fsNetwork = require("./network/firestoreNetwork.js");

// Expressアプリ 初期化
const app = express();
app.use(cors());

////////////////////////////////////////////////////////////////

// Arduino Serial
const arduinoCOMPort = arduino.arduinoCOMPort;
const parser = arduino.parser;

// 変数用意
let currentTemp = null; // 現在の室温
let flag = 0;

// 定数用意
const offset = -6;

// シリアル通信 開始時
parser.on("open", () => {
  console.log(`Serial Port ${arduinoCOMPort} is opened.`);
});

// シリアル通信 受信時
parser.on("data", (data) => {
  // 現在の室温を反映
  const temp = util.getNumberVal(data);
  if (temp !== null) currentTemp = temp + offset;

  if ((process.env.STORE || "false") === "true") {
    // 現在の日時(秒・ミリ秒は無視)
    const _d = new Date();
    _d.setSeconds(0, 0);

    // 10分おきにfiretoreに室温を保存
    if (_d.getTime() !== flag && _d.getMinutes() % 10 === 0) {
      console.log(_d);
      flag = _d.getTime();

      // firestoreに保存
      fsNetwork.saveTempData(currentTemp, _d);
    }
  }
});

////////////////////////////////////////////////////////////////

// indexページ
app.get("/", (_, res) => {
  return res.send("Hello Awecon!");
});

// 現在の室温を取得
app.get("/temp", (_, res) => {
  return res.send(String(Math.round(currentTemp, 2)));
});

// Arduinoの制御
app.get("/control/:action", action.index);

////////////////////////////////////////////////////////////////

const port = process.env.NODE_PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
