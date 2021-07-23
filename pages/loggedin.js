import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext'
import firebase from './config/firebase'
import InputField from "../components/Input"
import SubmitForm from "../components/SubmitForm"
import styles from "../styles/home.module.css"


const LoggedIn = () => {
    const router = useRouter();
    const { authUser, loading, signOut } = useAuth();
    const [userData, setUserData] = useState({ data: {}, error: {}, boxes: [] });

    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && !authUser) {
            console.log("Loggedin Page")
            console.log(authUser, loading)
            router.push('/home')
        } else if (!loading && authUser) { getData() }

    }, [authUser, loading])

    const getData = async () => {
        const doc = await firebase.firestore().collection('users').doc(`${authUser.uid}`).get()
        const box = await firebase.firestore().collection('boxes').doc(`${authUser.uid}`).get()
        const data = { id: doc.id, ...doc.data() }
        setUserData({ ...userData, data, boxes: box.data().boxes })
    }

    useEffect(() => {
        console.log(userData);
    }, [userData])


    if (loading || !authUser) {
        return "";
    }

    const loggAPI = async () => {
        try {
            firebase.auth().currentUser.getIdToken().then(token => console.log('got token', token))
            const res = await firebase.firestore().collection('users').doc(`${authUser.uid}`).set({ someData: "123151afajk" }, { merge: true });
            const doc = await firebase.firestore().collection('users').doc(`${authUser.uid}`).get()
            const resBox = await firebase.firestore().collection('boxes').doc(`${authUser.uid}`).set({ boxes: [{ boxId: "123151afajk", name: "Title 1", content: ["Content1", "Content2", "Content3"] }, { boxId: "afajk", name: "Title 2", content: ["Content1", "Content2", "Content3"] }] }, { merge: true });
            const box = await firebase.firestore().collection('boxes').doc(`${authUser.uid}`).get()

            const data = { id: doc.id, ...doc.data() }
            console.log(data)
            console.log(box.data())
            setUserData({ ...userData, data, boxes: box.data().boxes })
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

    const onDeleteClick = async (e) => {
        e.preventDefault()
        const newArr = userData.boxes.filter(box => box.boxId !== e.target.id)
        console.log(newArr);
        setUserData({ ...userData, boxes: newArr })
    }

    const onChangeHandler = (e) => {
        console.log(e.target.id);
        const arr = userData.boxes
        const data = userData.boxes.filter(b => b.boxId === e.target.id)
        const index = userData.boxes.map(function (e) { return e.boxId; }).indexOf(data[0].boxId)
        const newData = { ...data[0], name: e.target.value }
        arr[index] = { ...newData }

        setUserData({ ...userData, boxes: [...arr] })
    }

    const addBox = () => {
        const arr = userData.boxes
        arr.push({ boxId: "9839487hfh", name: "", content: ["Box1", "Box2", "Box3"] })
        setUserData({ ...userData, boxes: [...arr] })
    }


    const postBox = async () => {
        const resBox = await firebase.firestore().collection('boxes').doc(`${authUser.uid}`).set({ boxes: [...userData.boxes] }, { merge: true });
        const box = await firebase.firestore().collection('boxes').doc(`${authUser.uid}`).get()
        setUserData({ ...userData, boxes: [...box.data().boxes] })
    }

    return (
        //Your logged in page
        <div className={styles.container}>
            <div className={styles.menu}>
                <p>Menu</p>
            </div>
            <div className={styles.content}>
                <button onClick={loggAPI}>Logg api call</button>
                <button onClick={signOut}>Sign Out</button>

                <p>{userData.data ? userData.data.data : ""}</p>
                {console.log(userData.boxes)}
                {userData.boxes.map(e => <div key={e.boxId}>
                    <InputField id={e.boxId} value={e.name} onChange={onChangeHandler}></InputField>
                    <button id={e.boxId} onClick={onDeleteClick}>delete</button>
                </div>)}
                <button onClick={addBox}>Add Field</button>
                <button onClick={postBox}>Save</button>
            </div>

        </div>
    )
}

export default LoggedIn;