import { auth, firestore } from '../config/firestore';

export default async (req, res) => {
    console.log(req.headers)
    if (!req.headers.token) {
        return res.status(401).json({ error: 'Please include id token' });
    }

    try {
        const { uid } = await auth.verifyIdToken(req.headers.token);
        req.uid = uid;
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }

    const doc = await firestore.collection('users').doc(`${req.query.id}`).get()
    const data = { id: doc.id, ...doc.data() }
    console.log(req.query.id)
    console.log("-----", data)
    res.statusCode = 200
    res.json(data)
}