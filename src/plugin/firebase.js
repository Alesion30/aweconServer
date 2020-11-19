const firebase = require("firebase");

const config = {
    apiKey: process.env.FIRESTORE_API_KEY,
    authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
    databaseURL: process.env.FIRESTORE_DATABASE_URL,
    projectId: process.env.FIRESTORE_PROJECT_ID,
    storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRESTORE_MESSAGEING_SENDER_ID,
    appId: process.env.FIRESTORE_APP_ID,
    measurementId: process.env.FIRESTORE_MEASUREMENT_ID
};
const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();

// export
exports.firestore = firestore;
exports.firebase = firebaseApp;
