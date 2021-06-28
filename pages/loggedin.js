import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext'
import firebase from './config/firebase'


const LoggedIn = () => {
    const router = useRouter();
    const { authUser, loading, signOut } = useAuth();


    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && !authUser) {
            console.log(authUser, loading)
            useAuth().getInstance().getCurrentUser();
            router.push('/home')
        }

    }, [authUser, loading])

    const loggAPI = async () => {
        try {
            firebase.auth().currentUser.getIdToken().then(token => console.log('got token', token))
            const doc = await firebase.firestore().collection('users').doc(`${authUser.uid}`).get()
            const data = { id: doc.id, ...doc.data() }
            console.log(data)
        } catch (error) {
            console.log(error.code, error.message)
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
        </>
    )
}

export default LoggedIn;