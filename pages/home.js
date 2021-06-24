import React from 'react'
import Link from "next/link"

export default function Home() {
    const formSubmit = e => {
        e.preventDefault();
        console.log(e.target.name.value)
        console.log(e.target.password.value)
    }

    return (
        <div>
            <h1>Home Page</h1>
            <Link href="/secure">Got to Secure Page</Link>
            <form onSubmit={formSubmit}>
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
