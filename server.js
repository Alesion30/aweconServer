const express = require("express");
const app = express();
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// Corresponding CORS(Cross-Origin Resource Sharing)
const cors = require("cors");
app.use(cors());

// config
const port = 3001;
const arduinoCOMPort = "/dev/cu.usbmodem141401";

// Arduino Serial
const parser = new Readline();
const arduinoSerial = new SerialPort(arduinoCOMPort);
arduinoSerial.pipe(parser);

// シリアル通信 開始時
parser.on("open", function () {
  console.log("Serial Port " + arduinoCOMPort + " is opened.");
});

// シリアル通信 受信時
let currentTemp = 0;
parser.on("data", (data) => {
  // 送られてきたデータが数値だったら、現在の室温に反映
  let castData = Number(data);
  if (!isNaN(castData)) {
    console.log("temp: " + castData);
    currentTemp = castData;
  } else {
    console.log("data: " + data);
  }
});

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
app.get("/control/:action", function (req, res) {
  const action = req.params.action; // actionを受け取る

  // actionによって、Arduinoを制御
  switch (action) {
    case "led":
      arduinoSerial.write("w");
      return res.send("Led light is on!");
    case "off":
      arduinoSerial.write("t");
      return res.send("Led light is off!");
    default:
      return res.send("Action: " + action);
  }
});

////////////////////////////////////////////////////////////////

app.listen(port, function () {
  console.log("listening on port http://localhost:" + port + "!");
});
