import { useEffect, useState } from "react"
import ReviewCard from "../components/ReviewCard"
import { useSearchParams } from "react-router-dom"

export default function HomePage() {
    const [reviews, setReviews] = useState<any[]>([])
    const [searchParams, setSearchParams] = useSearchParams({ sort_by: "rate" })

    useEffect(() => {
        const fetchReviews = async ()=> {
            const url = new URL(window.location.origin + "/api/review")
            if (searchParams.has("query")) {
                url.searchParams.set("query", searchParams.get("query")!)
            }
            if (searchParams.has("sort_by")) {
                url.searchParams.set("sort", searchParams.get("sort_by")!)
            }
            const response = await fetch(url.href)
            const data = await response.json()
            if (data.reviews) {
                setReviews(data.reviews)
            }
        }
        fetchReviews()
        return () => setReviews([])
    }, [searchParams])

    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault()
        setSearchParams(prev => ({ ...prev, sort_by: event.target.value }))
    }

    return (
        <div className="flex flex-col gap-2 px-2">
            <div className="w-full flex gap-2">
                <form className="flex-1 flex bg-white rounded overflow-hidden shadow">
                    <input name="query" onChange={(event) => setSearchParams(prev=>({ ...prev, query: event.target.value}))} value={searchParams.get("query") || ""} className="outline-none flex-1 px-4 py-1" type="text" placeholder="Search a keyword" />
                    {/* <button className="flex items-center justify-center px-2" type="submit">
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button> */}
                    <div className="h-full w-[1px] bg-neutral-200"></div>
                    <select className="px-1" onChange={onSelectChange} name="sort_by" value={searchParams.get("sort")!}>
                        <option value="date">Date Posted</option>
                        <option value="rate">Ratings</option>
                    </select>
                </form>
                <a className="flex items-center px-2 rounded shoadow bg-purple-500 text-white" href="/post">Post Review</a>
            </div>
            {reviews.length > 0 ?
                <ul className="flex flex-col gap-2">
                    {reviews.map(review => (
                        <li key={review._id}>
                            <a href={`/${review._id}`}>
                                <ReviewCard {...review} />
                            </a>
                        </li>
                    ))}
                </ul>: 
                <p>No reviews to show</p>
            }
        </div>
    )
}