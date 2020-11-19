// dataが数値ではないとき、nullを返却
const getNumberVal = (data) => {
    let temp;
    let castData = Number(data);
    if (!isNaN(castData)) {
      temp = castData;
    } else {
      temp = null;
    }
    return temp;
};
exports.getNumberVal = getNumberVal;
