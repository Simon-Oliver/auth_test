import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext'
import firebase from './config/firebase'


const LoggedIn = () => {
    const router = useRouter();
    const { authUser, loading, signOut } = useAuth();
    const [userData, setUserData] = useState({ data: {}, error: {} });


    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && !authUser) {
            console.log("Loggedin Page")
            console.log(authUser, loading)
            router.push('/home')
        }

    }, [authUser, loading])

    useEffect(() => {
        console.log(userData)

    }, [userData])

    if (loading || !authUser) {
        return "";
    }

    const loggAPI = async () => {
        try {
            firebase.auth().currentUser.getIdToken().then(token => console.log('got token', token))
            const res = await firebase.firestore().collection('users').doc(`${authUser.uid}`).set({ someData: "123151afajk" }, { merge: true });
            const doc = await firebase.firestore().collection('users').doc(`${authUser.uid}`).get()
            const resBox = await firebase.firestore().collection('box').doc(`${authUser.uid}`).set({ boxId: "123151afajk", content: ["Box1", "Box2", "Box3"] }, { merge: true });
            const box = await firebase.firestore().collection('box').doc(`${authUser.uid}`).get()

            const data = { id: doc.id, ...doc.data() }
            console.log(data)
            console.log(box.data())
            setUserData({ ...userData, data, boxes: box.data() })
        } catch (error) {
            console.log(error)
            setUserData({ ...userData, error: [error.code, error.message] })
            console.log(userData)
        }

        // console.log(authUser.uid)
        // const doc = await firebase.firestore().collection('users').doc(`${authUser.uid}`).get()
        // const data = { id: doc.id, ...doc.data() }
        // console.log(req.query.id)
        // const res = await fetch(`api/postData?id=${encodeURIComponent(authUser.uid)}`)
        // const data = await res.json()
    }

    return (
        //Your logged in page
        <>
            <h1>Logged in</h1>
            <button onClick={loggAPI}>Logg api call</button>
            <button onClick={signOut}>Sign Out</button>

            <p>{userData.data ? userData.data.data : ""}</p>
            {userData.boxes.content.map(e => <p>{e}</p>)}
        </>
    )
}

export default LoggedIn;