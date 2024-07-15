import { useContext, useState,useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function NavBar() {
    const { user } = useContext(AuthContext)

    const signOut = async () => {
        const response = await fetch(
            "/api/auth/signout",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const data = await response.json()
        if (data.error) {
            alert(data.error)
        }
        if (data.message) {
            alert(data.message)
            window.location.href = '/'
        }
    }

    const [hidden,setHidden] = useState(false);
    const [prevScrollPos,setPrevScrollPos] = useState(window.scrollY);

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        if(currentScrollPos > 100)
        {
            const visible = prevScrollPos > currentScrollPos;
            setHidden(!visible);
            setPrevScrollPos(currentScrollPos);
        }
        else
        {
            setHidden(false);
        }
      };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, hidden, handleScroll]);

    return (
        <nav className={`w-full flex sm:px-10 px-3 py-3 bg-blue-600 fixed transition-[top] duration-700 ${hidden ? 'top-[-50px]' : 'top-0'}`} >
            <div className="w-full flex justify-between">
                <div>
                    <a href="/" className="text-xl font-semibold text-white">RightReview&#10003;</a>
                </div>
                <div>
                    {!user && <a className="bg-white rounded px-4 py-1 font-semibold" href="/signin">Sign In</a>}
                    {user && <button onClick={signOut} className="bg-white rounded px-4 py-1 font-semibold">Sing Out</button>}
                </div>
            </div>
        </nav>
    )
}