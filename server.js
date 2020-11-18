const express = require("express");
const app = express();
const SerialPort = require("serialport");

// config
const port = 3001;
const arduinoCOMPort = "/dev/cu.usbmodem141401";

// Arduino Serial
const arduinoSerialPort = new SerialPort(arduinoCOMPort, 9600);
arduinoSerialPort.on("open", function () {
  console.log("Serial Port " + arduinoCOMPort + " is opened.");
});
arduinoSerialPort.on("data", (data) => {
  console.log("Data: " + data);
});

////////////////////////////////////////////////////////////////

// indexページ
app.get("/", function (req, res) {
  return res.send("Working");
});

// action LED制御
app.get("/:action", function (req, res) {
  var action = req.params.action;

  if (action == "led") {
    arduinoSerialPort.write("w");
    return res.send("Led light is on!");
  }
  if (action == "off") {
    arduinoSerialPort.write("t");
    return res.send("Led light is off!");
  }

  return res.send("Action: " + action);
});

////////////////////////////////////////////////////////////////

app.listen(port, function () {
  console.log("Example app listening on port http://localhost:" + port + "!");
});
