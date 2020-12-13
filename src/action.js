const arduino = require("./arduino.js");
const arduinoSerial = arduino.arduinoSerial;

exports.index = (req, res) => {
  const action = req.params.action; // actionを受け取る

  // Arduinoにactionを送信
  switch (action) {
    // case "led":
    //   arduinoSerial.write("w");
    //   return res.send("Led light is on!");
    // case "off":
    //   arduinoSerial.write("t");
    //   return res.send("Led light is off!");
    case "on":
      //Power, Mode, Fan(風量), Temp, Vdir(風向高さ), Hdir(風向左右)
      arduinoSerial.write('P1M2F0T4V0H0E');
      return res.send("Air conductor ON!");
    case "off":
      arduinoSerial.write("O");
      return res.send("Air conductor OFF!");
    default:
      return res.send("Action: " + action);
  }
};
