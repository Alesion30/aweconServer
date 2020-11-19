const firebase = require("../plugin/firebase.js");
const db = firebase.firestore;

const saveTempData = (temp, date) => {
  db.collection("data")
    .add({
      date: date,
      temperature: temp,
      threshold: 20,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

exports.saveTempData = saveTempData;
