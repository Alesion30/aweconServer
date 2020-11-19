const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// arduino setup
const arduinoCOMPort = process.env.COM_PORT;
const parser = new Readline();
const arduinoSerial = new SerialPort(arduinoCOMPort);
arduinoSerial.pipe(parser);

// export
exports.arduinoCOMPort = arduinoCOMPort;
exports.parser = parser;
exports.arduinoSerial = arduinoSerial;
