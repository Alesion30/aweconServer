const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// arduino setup
const arduinoCOMPort = process.env.COM_PORT;
const parser = new Readline();
const arduinoSerial = new SerialPort(arduinoCOMPort);
arduinoSerial.pipe(parser);

// データ受信時の挙動
const resiveAction = (data) => {
  // 送られてきたデータが数値だったら、現在の室温に反映
  let castData = Number(data);
  if (!isNaN(castData)) {
    console.log("temp: " + castData);
    currentTemp = castData;
  } else {
    console.log("data: " + data);
  }
};

// export
exports.parser = parser;
exports.arduinoSerial = arduinoSerial;
exports.action = resiveAction;
