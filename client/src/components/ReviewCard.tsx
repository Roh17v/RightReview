import Rating from "./Rating";

interface Props {
    body: string,
    author: { username: string },
    rating: number,
    product: string,
    createdAt: string,
}

export default function ReviewCard({
   body,
   author,
   rating,
   product,
   createdAt,
}: Props) {
    return (
        <div className="flex flex-col gap-2 bg-white rounded p-4 shadow">
            <div className="flex gap-2 items-center">
                <div className="size-8 bg-neutral-500 rounded-full"></div>
                <Rating value={rating} />
            </div>
            <div className="flex gap-1">
                <span className="font-semibold">{author.username}</span>
                reviewed
                <span className="font-semibold">{product}</span>
                on
                <span className="font-semibold">{new Date(createdAt).toDateString()}</span>
            </div>
            <div>{body}</div>
        </div>
    )
}