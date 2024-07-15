import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

export default function SignInPage() {
    const { user } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = { email, password }
        const response = await fetch(
            "/api/auth/signin",
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        const data = await response.json()
        if (data.error) {
            alert(data.error)
        }
        if (data.message) {
            alert(data.message)
            window.location.href = "/"
        }
    }

    if (user) {
        return <Navigate replace to='/' />
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={onFormSubmit} className="bg-white p-4 shadow flex flex-col gap-2">
                <div className="text-center text-xl font-semibold mb-4">Sign In</div>
                <input autoComplete="off" onChange={onEmailChange} className="border rounded px-4 py-2" placeholder="Email" type="text" name="email" value={email} />
                <input autoComplete="off" onChange={onPasswordChange} className="border rounded px-4 py-2" placeholder="Password" type="password" name="password" value={password} />
                <input className="mt-4 bg-blue-600 text-white rounded px-2 py-2" type="submit" value="Sign In" />
            </form>            
        </div>
    )
}