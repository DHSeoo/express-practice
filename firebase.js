var firebase = require("firebase-admin"); // npm i firebase-admin --save

var serviceAccount = require("./firebaseKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

module.exports = firebase;