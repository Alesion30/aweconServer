"use strict";

// Set up express server
const express = require("express");
const app = express();
const PORT = 3001;

// Corresponding CORS(Cross-Origin Resource Sharing)
const cors = require("cors");
app.use(cors());

// Start server
app.listen(PORT, () => {
  console.log(
    "Expressサーバーがポート%dで起動しました。モード:%s",
    PORT,
    app.settings.env
  );
});

// Set up Serial Communication
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const parser = new Readline();
const port = new SerialPort("/dev/cu.URT0");
port.pipe(parser);

// Load Sensor value
parser.on("data", line => {
  convert(line);
});

let DataJson = { data: 0 };

// Convert Sensor value to JSON
const convert = line => {
  console.log(`> ${line}`);
  DataJson = {
    data: line
  };
};

// Push JSON
app.get("/", (req, res) => {
  res.json(DataJson);
});
