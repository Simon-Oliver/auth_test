import React from 'react'
import Link from "next/link"
import { useAuth } from './context/authContext'
import { useRouter } from 'next/router';
import Login from "../components/Login"



export default function Home() {
    const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = useAuth();
    const router = useRouter()

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
        const data = { email: e.target.name.value, password: e.target.password.value }
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
        <div>
            <h1>Home Page</h1>
            <Login></Login>
            <Link href="/secure">Got to Secure Page</Link>
            <form onSubmit={onSubmit}>
                <label>
                    Username:
                    <input type="text" name="name" />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <h2>Sign In</h2>
            <form onSubmit={onSubmitSign}>
                <label>
                    Username:
                    <input type="text" name="name" />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
