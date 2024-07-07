interface Props {
    value: number
}

export default function Rating({ value }: Props) {
    return (
        <div className="flex gap-1">
            {Array(value).fill(0).map(_ => (
                <div className="size-4 bg-green-600"></div>
            ))}
            {Array(5 - value).fill(0).map(_ => (
                <div className="size-4 bg-zinc-400"></div>
            ))}
        </div>
    )
}