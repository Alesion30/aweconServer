const arduino = require("./arduino.js");
const arduinoSerial = arduino.arduinoSerial;

exports.index = (req, res) => {
  const action = req.params.action; // actionを受け取る

  // Arduinoにactionを送信
  switch (action) {
    case "on":
      //arduinoにエアコン起動に必要な情報を送信
      //Power(電源), Mode, Fan(風量), Temp(20度台下一桁),{t(10度台)}, Vdir(風向高さ), Hdir(風向左右)
      arduinoSerial.write('P');
      arduinoSerial.write('1');
      arduinoSerial.write('M');
      arduinoSerial.write('2');
      arduinoSerial.write('F');
      arduinoSerial.write('0');
      arduinoSerial.write('T');
      arduinoSerial.write('4');
      arduinoSerial.write('V');
      arduinoSerial.write('0');
      arduinoSerial.write('H');
      arduinoSerial.write('0');
      arduinoSerial.write('E');
      return res.send("Air conductor ON!");
    case "off":
      arduinoSerial.write("O");
      return res.send("Air conductor OFF!");
    default:
      return res.send("Action: " + action);
  }
};
