const arduino = require('./arduino.js');
const arduinoSerial = arduino.arduinoSerial;

exports.index = (req, res) => {
  const action = req.params.action; // actionを受け取る

  // Arduinoにactionを送信
  switch (action) {
    case 'on':
      const { mode, fan, temp, vdir, hdir } = req.query;

      // エラーハンドリング
      if (!mode || !fan || !temp || !vdir || !hdir) res.status(500).send('Invalid argument');
      if (!(mode == 1 || mode == 2 || mode == 3 || mode == 4)) res.status(500).send('Invalid argument[mode]');
      if (!(fan == 0 || fan == 1 || fan == 2 || fan == 3 || fan == 4 || fan == 5)) res.status(500).send('Invalid argument[fan]');
      if (temp < 16 || temp >= 30) res.status(422).send('Invalid argument[temp]');
      if (!(vdir == 0 || vdir == 1 || vdir == 2 || vdir == 3 || vdir == 4 || vdir == 5)) res.status(500).send('Invalid argument[vdir]');
      if (!(hdir == 0 || hdir == 1 || hdir == 2 || hdir == 3 || hdir == 4 || vdir == 5)) res.status(500).send('Invalid argument[hdir]');

      let tempCode; // 16~19度 -> t, 20~30度 -> T
      let tempDigit; // 温度下一桁
      if (req.query.temp < 20) {
        tempCode = 't';
        tempDigit = req.query.temp - 10;
        tempDigit = String(tempDigit);
      } else {
        tempCode = 'T';
        tempDigit = req.query.temp - 20;
        tempDigit = String(tempDigit);
      }

      //arduinoにエアコン起動に必要な情報を送信
      //Mode(運転モード)
      arduinoSerial.write('M');
      arduinoSerial.write(mode);
      //Fan(風量),
      arduinoSerial.write('F');
      arduinoSerial.write(fan);
      //Temp(20度台下一桁),{t(10度台)},
      arduinoSerial.write(tempCode);
      arduinoSerial.write(tempDigit);
      //Vdir(風向高さ)
      arduinoSerial.write('V');
      arduinoSerial.write(vdir);
      //Hdir(風向左右)
      arduinoSerial.write('H');
      arduinoSerial.write(hdir);
      //End(終了信号)
      arduinoSerial.write('E');

      const json = {
        message: 'Successfully activated the air conditioner!!',
        query: req.query
      };
      return res.json(json);
    case 'off':
      arduinoSerial.write('O');
      return res.send('Successfully deactivated the air conditioner...');
    default:
      return res.send('Action: ' + action);
  }
};
