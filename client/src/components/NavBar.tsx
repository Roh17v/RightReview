import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function NavBar() {
    const { user } = useContext(AuthContext)
    return (
        <nav className="w-full flex justify-center px-4 py-2 bg-blue-600">
            <div className="w-full max-w-2xl flex items-center justify-between">
                <div>
                    <a href="/" className="text-lg font-semibold text-white">RightReview</a>
                </div>
                <div>
                    {!user && <a className="bg-white rounded px-4 py-1 font-semibold" href="/signin">Sign In</a>}
                    {user && <p>{user.username}</p>}
                </div>
            </div>
        </nav>
    )
}