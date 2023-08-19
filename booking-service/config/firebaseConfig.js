const admin = require('firebase-admin');

// Initialize Firebase with the service account
const serviceAccount = require('../techtriathlon-firebase-adminsdk-qrv5f-4db31f9a94.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://YOUR_FIREBASE_APP_ID.firebaseio.com'
});

module.exports = admin;
