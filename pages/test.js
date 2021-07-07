import React, { useState, useEffect } from 'react'
import InputField from "../components/Input"
import SubmitForm from "../components/SubmitForm"

export default function test() {
    const [inputValue, setInputValue] = useState({ email: "", password: "", password1: "" });
    const { email, password, password1 } = inputValue;
    const [isErrorPW, setIsErrorPW] = useState({ error: "" })

    useEffect(() => {
        if (password === password1) {
            setIsErrorPW({ error: "" })
        } else {
            setIsErrorPW({ error: "Password not matching" })
        }

    }, [inputValue])

    useEffect(() => {
        console.log("////////////", isErrorPW)
    }, [isErrorPW])

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
        }
    }

    return (
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
                disabled={isErrorPW}
            >Continue</SubmitForm>
        </form>
    )
}
