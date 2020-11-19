// モジュール読み込み
const express = require("express");
const cors = require("cors");

// 環境変数ファイル(.env) 読み込み
require("dotenv").config();

// 外部ファイル 読み込み
const arduino = require("./arduino.js");
const action = require("./action.js");

// Expressアプリ 初期化
const app = express();
app.use(cors());

////////////////////////////////////////////////////////////////

// Arduino Serial
const parser = arduino.parser;

// シリアル通信 開始時
parser.on("open", function () {
  console.log("Serial Port " + arduinoCOMPort + " is opened.");
});

// シリアル通信 受信時
let currentTemp = null;
parser.on("data", arduino.action);

////////////////////////////////////////////////////////////////

// indexページ
app.get("/", function (req, res) {
  return res.send("Working");
});

// 現在の室温を取得
app.get("/temp", function (req, res) {
  return res.send(String(currentTemp));
});

// Arduinoの制御
app.get("/control/:action", action.index);

////////////////////////////////////////////////////////////////

const port = process.env.NODE_PORT || 3001;
app.listen(port, function () {
  console.log("listening on port http://localhost:" + port + "!");
});
