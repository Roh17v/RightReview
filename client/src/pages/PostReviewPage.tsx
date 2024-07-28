import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function PostReviewPage() {
    const { user } = useContext(AuthContext)
    const [product, setProduct] = useState('')
    const [rating, setRating] = useState(0)
    const [body, setBody] = useState('')

    const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const response = await fetch(
            "/api/review",
            {
                method: "POST",
                body: JSON.stringify({
                    product,
                    rating,
                    body,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        const data = await response.json()
        if (data.error) {
            alert(data.error)
            if (!user) {
                window.location.href = "/signin"
            }
        }
        if (data) {
            window.location.href = `/${data._id}`
        }
    }

    return (
        <div className="">
            <form onSubmit={onFormSubmit} className="w-full flex flex-col bg-white rounded shadow overflow-hidden gap-2">
                <div className="border-b px-4 py-2 font-semibold">Post Review</div>
                <div className="flex flex-col p-2 gap-2">
                    <input autoComplete="off" value={product} onChange={(event) => setProduct(event.target.value)} placeholder="Product Name" className="border rounded px-2 py-1" type="text" name="product" />
                    <input value={rating} onChange={(event) => setRating(+event.target.value)} className="border rounded px-2 py-1" type="number" max={5} min={0} name="rating" />
                    <textarea autoComplete="off" value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write your review ..." className="border rounded px-2 py-1" name="body" />
                </div>
                <div className="w-full flex justify-end p-2">
                    <button type="submit" className="flex items-center px-4 py-1 rounded shoadow bg-purple-500 text-white">Submit</button>
                </div>
            </form>
        </div>
    )
}