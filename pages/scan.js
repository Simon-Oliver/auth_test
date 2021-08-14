import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext'
import firebase from './config/firebase'
import dynamic from 'next/dynamic'
import styles from "../styles/home.module.css"

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })



export default function scan() {
    const router = useRouter();
    const { authUser, loading, signOut } = useAuth();
    const [userData, setUserData] = useState({ data: {}, error: {}, boxes: [] });
    const [show, setShow] = useState(true)
    const [scanData, setScanData] = useState({})

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

    const handleScan = data => {
        if (data) {
            console.log('----->>>', userData.boxes);
            const filtered = userData.boxes.filter(box => box.boxId === data)
            setScanData(filtered)
            setShow(false)
        }
    }

    const scan = () => {
        setScanData({})
        setShow(true)
    }

    const renderScanData = (data) => {
        return data.map(e => {
            const list = e.content.map(i => <li key={i}>{i}</li>)
            return (
                <>
                    <h3>{e.name}</h3>
                    <ul>{list}</ul>
                </>
            )
        })
    }

    return (
        <div>
            <h1>Scan</h1>
            {show ? <QrReader className={styles.scanner} onScan={handleScan} onError={() => console.log('error')} /> :
                <>
                    {renderScanData(scanData)}
                    <button onClick={scan}>Scan</button>
                </>}
        </div>
    )
}
