import React, { useState, useEffect } from 'react'
import InputField from "../components/Input"
import SubmitForm from "../components/SubmitForm"

export default function test() {
    const [inputValue, setInputValue] = useState({ email: "", password: "", password1: "" });
    const { email, password, password1 } = inputValue;
    const [isNotMatch, setIsNotMatch] = useState(false)

    useEffect(() => {
        if (password === password1) {
            setIsNotMatch(false)
        } else {
            setIsNotMatch(true)
        }

    }, [inputValue])

    useEffect(() => {
        console.log("////////////", isNotMatch)
    }, [isNotMatch])

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
                type="text"
                value={email}
                label="Email"
                name="email"
                onChange={handleChange} />

            <InputField
                type="password"
                value={password}
                label="Password"
                name="password"
                onChange={handleChange}
            />
            <InputField
                type="password"
                value={password1}
                label="Confirm Password"
                name="password1"
                onChange={handleChange}
                isNotMatch={isNotMatch}
            />
            <SubmitForm
                css="submit"
                value="Continue"
                disabled={isNotMatch}
            >Continue</SubmitForm>
        </form>
    )
}
