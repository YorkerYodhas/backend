const admin = require('firebase-admin');

// Initialize Firebase with the service account
const serviceAccount = require('path_to_your_firebase_serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://YOUR_FIREBASE_APP_ID.firebaseio.com'
});

module.exports = admin;
