import { auth, firestore } from '../config/firestore';

export default async (req, res) => {
    // console.log(req.headers)
    // if (!req.headers.token) {
    //     return res.status(401).json({ error: 'Please include id token' });
    // }

    // try {
    //     const { uid } = await auth.verifyIdToken(req.headers.token);
    //     req.uid = uid;
    // } catch (error) {
    //     return res.status(401).json({ error: error.message });
    // }

    //const doc = await firestore.collection('users').doc(`${req.query.id}`).get()
    const doc = await firestore.collection('boxes').get()
    const snap = await firestore.collection('boxes')
    const observer = snap.onSnapshot(docSnapshot => {
        docSnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                console.log('New: ', change.doc.data());
            }
            if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data());
            }
            if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data());
            }
        });

        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
    const data = { id: doc.id, ...doc.docs.map(doc => doc.data()) }
    console.log(req.query.id)
    console.log("-----", data)
    res.statusCode = 200
    res.json(data)
}