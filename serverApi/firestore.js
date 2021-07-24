var admin = require('firebase-admin')
require('dotenv').config();

console.log("ENV -------", process.env);

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVAT_KEY,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
});


const firestore = admin.firestore();
// const auth = admin.auth();

module.exports = firestore