import firebase from "../config/firebase"
import 'firebase/firestore'

export default async (req, res) => {
    //firebase.auth().currentUser.getIdToken().then(token => console.log('got token', token))
    const doc = await firebase.firestore().collection('users').doc(`${req.query.id}`).get()
    const data = { id: doc.id, ...doc.data() }
    console.log(req.query.id)
    console.log("-----", data)
    res.statusCode = 200
    res.json(data)
};


// export default (req, res) => {
//     // res.statusCode = 200
//     // res.json(req.query)
// }    

// export async function getUser(uid) {
//     const doc = await firestore.collection('users').doc(uid).get();
//     const user = { id: doc.id, ...doc.data() };
//     return user;
// }