const arduino = require("./arduino.js");
const arduinoSerial = arduino.arduinoSerial;

exports.index = (req, res) => {
  const action = req.params.action; // actionを受け取る

  // Arduinoにactionを送信
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
};
