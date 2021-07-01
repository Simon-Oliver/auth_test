import React from 'react'
import styles from './Login.module.css'
import Link from "next/link"
import { useAuth } from '../../pages/context/authContext'
import { useRouter } from 'next/router';
import firebase from "../../pages/config/firebase";

export default function Login() {
    const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = useAuth();
    const router = useRouter()

    var provider = new firebase.auth.GoogleAuthProvider();

    const googleAuth = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                router.push("/loggedin")
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    const signUp = ({ email, password }) => {
        return createUserWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response)
                router.push("/loggedin")
            })
            .catch((error) => {
                return { error };
            });
    };

    const signIn = ({ email, password }) => {
        return signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response)
                router.push("/loggedin")
            })
            .catch((error) => {
                return { error };
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = { email: e.target.name.value, password: e.target.password.value }
        return signUp(data).then((user) => {
            console.log(user);
        });
    };

    const onSubmitSign = (e) => {
        e.preventDefault();
        const data = { email: e.target.email.value, password: e.target.password.value }
        return signIn(data).then((user) => {
            console.log(user);
        });
    };

    const formSubmit = e => {
        e.preventDefault();
        console.log(e.target.name.value)
        console.log(e.target.password.value)
    }

    return (
        <div className={styles.box}>
            <p>Log in to continue to the Dashboard.</p>
            <form onSubmit={onSubmitSign}>
                <div>
                    <label className={`${styles.label} `} for="email">Email</label>
                    <input className={`${styles.input} `} type="email" name="email" id="email"></input>
                </div>
                <div>
                    <label className={`${styles.label} `} for="password">Password</label>
                    <input className={`${styles.input} `} type="password" name="password" id="password"></input>
                </div>
                <input className={`${styles.button} ${styles.submit}`} type="submit" value="Continue" />
            </form>
            <p>Don’t have an account? <a href="#">Signup</a></p>
            <div className={styles.divider}>OR</div>
            <button onClick={googleAuth} className={`${styles.button} `}><img className={styles.logo} src="img/Google__G__Logo.svg" />Continue with Google</button>
        </div>
    )
}
