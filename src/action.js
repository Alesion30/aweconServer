const arduino = require("./arduino.js");
const arduinoSerial = arduino.arduinoSerial;

exports.index = (req, res) => {
  const action = req.params.action; // actionを受け取る
  let temp_str;   //16~19度→t, 20度~→T
  let temp_int;   //温度下一桁

  // Arduinoにactionを送信
  switch (action) {
    case "on":
      if (req.query.temp < 20) {
        temp_str = 't';
        temp_int = req.query.temp - 10;
        temp_int = String(temp_int);
      } else {
        temp_str = 'T';
        temp_int = req.query.temp - 20;
        temp_int = String(temp_int);
      }
      
      //arduinoにエアコン起動に必要な情報を送信
      //Power(電源)
      // arduinoSerial.write('P');
      // arduinoSerial.write(req.query.power);
      //Mode(運転モード)
      arduinoSerial.write('M');
      arduinoSerial.write(req.query.mode);
      //Fan(風量), 
      arduinoSerial.write('F');
      arduinoSerial.write(req.query.fan);
      //Temp(20度台下一桁),{t(10度台)},
      arduinoSerial.write(temp_str);
      arduinoSerial.write(temp_int);
      //Vdir(風向高さ)
      arduinoSerial.write('V');
      arduinoSerial.write(req.query.vdir);
      //Hdir(風向左右)
      arduinoSerial.write('H');
      arduinoSerial.write(req.query.hdir);
      //End(終了信号)
      arduinoSerial.write('E');
      return res.send("Air conductor ON!");
    case "off":
      arduinoSerial.write("O");
      return res.send("Air conductor OFF!");
    default:
      return res.send("Action: " + action);
  }
};
