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
            <div className="">
                <span className="font-semibold mr-1">{author.username}</span>
                <span className="text-neutral-600">reviewed</span>
                <span className="font-semibold mx-1">{product}</span>
                <span className="text-neutral-600">on</span>
                <span className="font-semibold ml-1">{new Date(createdAt).toDateString()}</span>
            </div>
            <div>{body}</div>
        </div>
    )
}