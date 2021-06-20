import React from 'react'
import Link from "next/link"

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <Link href="/secure">Got to Secure Page</Link>
        </div>
    )
}
