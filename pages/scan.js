import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext'
import firebase from './config/firebase'
import InputField from "../components/Input"
import SubmitForm from "../components/SubmitForm"
import styles from "../styles/home.module.css"
import QRCode from 'qrcode.react'


export default function scan() {
    const router = useRouter();
    const { authUser, loading, signOut } = useAuth();
    const [userData, setUserData] = useState({ data: {}, error: {}, boxes: [] });

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
        console.log('Scan Data', userData);
    }, [userData])


    if (loading || !authUser) {
        return "";
    }


    return (
        <div>
            <h1>Scan</h1>
        </div>
    )
}
