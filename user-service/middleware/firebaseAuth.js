// firebaseAuth.js (middleware)

const admin = require('../config/firebaseConfig');

const verifyFirebaseToken = async (req, res, next) => {
    const idToken = req.headers.authorization;
    console.log(idToken);

    if (!idToken) {
        return res.status(401).send('Authorization token missing');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        if (decodedToken) {
            req.user = decodedToken; // Attach the decoded payload to the request
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        res.status(401).send('Invalid token or Unauthorized');
        console.log(error);
    }
};

module.exports = verifyFirebaseToken;
