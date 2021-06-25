import { auth } from './config/firebase';
import React from 'react'
import Link from "next/link"


export default function Home() {

    const signUp = ({ email, password }) => {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response)
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

    const formSubmit = e => {
        e.preventDefault();
        console.log(e.target.name.value)
        console.log(e.target.password.value)
    }

    return (
        <div>
            <h1>Home Page</h1>
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
        </div>
    )
}
