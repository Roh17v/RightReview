import { useEffect, useState } from "react"
import ReviewCard from "../components/ReviewCard"

export default function HomePage() {
    const [reviews, setReviews] = useState<any[]>([])

    useEffect(() => {
        const fetchReviews = async ()=> {
            const response = await fetch("/api/review")
            const data = await response.json()
            if (data.reviews) {
                setReviews(data.reviews)
            }
        }
        fetchReviews()
        return () => setReviews([])
    }, [])

    return (
        <div className="">
            {reviews.length > 0 ?
                <ul className="flex flex-col gap-2">
                    {reviews.map(review => (
                        <li key={review._id}>
                            <ReviewCard {...review} />
                        </li>
                    ))}
                </ul>: 
                <p>No reviews to show</p>
            }
        </div>
    )
}