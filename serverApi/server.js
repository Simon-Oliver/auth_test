const firestore = require('./firestore.js')
const express = require('express')
const app = express()
const port = 8000


app.get('/', async (req, res) => {
    console.log(firestore);
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
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})