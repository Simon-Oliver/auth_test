import React, { useState, useEffect } from 'react'
import InputField from "../components/Input"
import SubmitForm from "../components/SubmitForm"

export default function test() {
    const [inputValue, setInputValue] = useState({ name: "", price: "" });
    const { name, price } = inputValue;


    useEffect(() => {
        console.log(inputValue)
    }, [inputValue])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClick = () => {
        console.log("-------->", inputValue)
        setInputValue({ name: "", price: "" })
    }

    return (
        <div>
            <InputField
                type="text"
                value={name}
                label="Name"
                name="name"
                onChange={handleChange} />

            <InputField
                type="number"
                value={price}
                label="Price"
                name="price"
                onChange={handleChange}
            />
            <SubmitForm
                clickHandler={handleClick}
                css="submit"
            >Continue</SubmitForm>
        </div>
    )
}
