import React, { useState, useEffect } from 'react'
import InputField from "../components/Input"
import SubmitForm from "../components/SubmitForm"
import { useAuth } from './context/authContext'
import { useRouter } from 'next/router';
import styles from '../styles/home.module.css'

export default function test() {
    const { authUser, loading, createUserWithEmailAndPassword, signInWithEmailAndPassword } = useAuth();
    const router = useRouter()

    const [inputValue, setInputValue] = useState({ email: "", password: "", password1: "" });
    const { email, password, password1 } = inputValue;
    const [isErrorPW, setIsErrorPW] = useState({ error: "" })

    useEffect(() => {
        if (!loading && authUser) {
            console.log(authUser, loading)
            router.push('/loggedin')
        }

    }, [authUser, loading])

    useEffect(() => {
        if (password === password1) {
            setIsErrorPW({ error: "" })
        } else {
            setIsErrorPW({ error: "Password not matching" })
        }

    }, [inputValue])


    useEffect(() => {
        console.log(isErrorPW)

    }, [isErrorPW])


    if (loading || authUser) {
        return "";
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (password == password1) {
            console.log("Pasword Matches")
            setInputValue({ email: "", password: "", password1: "" })
            const data = { email: e.target.email.value, password: e.target.password.value }
            return signUp(data).then((user) => {
                console.log(user);
            });
        }
    }

    const signUp = ({ email, password }) => {
        return createUserWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response)
                router.push("/loggedin")
            })
            .catch((error) => {
                setIsErrorPW({ error: error.message })
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = { email: e.target.name.value, password: e.target.password.value }
        return signUp(data).then((user) => {
            console.log(user);
        });
    };

    return (
        <div className={styles.body}>
            <div className={styles.box}>
                <form onSubmit={handleClick}>
                    <InputField
                        type="email"
                        value={email}
                        label="Email"
                        name="email"
                        required
                        onChange={handleChange} />

                    <InputField
                        type="password"
                        value={password}
                        label="Password"
                        name="password"
                        required
                        onChange={handleChange}
                    />
                    <InputField
                        type="password"
                        value={password1}
                        label="Confirm Password"
                        name="password1"
                        required
                        onChange={handleChange}
                        isError={isErrorPW}
                    />
                    <SubmitForm
                        css="submit"
                        value="Continue"
                        disabled={isErrorPW.error ? true : false}
                    >Continue</SubmitForm>
                </form>
            </div>
        </div>
    )
}
