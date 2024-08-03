import { useEffect, useState } from "react";
import Rating from "./Rating";

interface Props {
  body: string;
  author: { username: string };
  rating: number;
  product: string;
  createdAt: string;
  hoverEffect?: boolean;
}

export default function ReviewCard({
  body,
  author,
  rating,
  product,
  createdAt,
  hoverEffect,
}: Props) {
  const [avatarColor, setavatarColor] = useState("");

  useEffect(() => {
    setavatarColor(getRandomColor);
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const firstLetter = author.username.charAt(0).toUpperCase();
  return (
    <div
      className={`flex flex-col gap-2 bg-white rounded p-4 w-full shadow overflow-hidden ${
        hoverEffect
          ? "transition-transform transform hover:scale-105 hover:shadow-xl"
          : ""
      }`}
    >
      <div className="flex gap-2 items-center">
        <div
          className="avatar w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold"
          style={{ backgroundColor: avatarColor }}
        >
          {firstLetter}
        </div>
        <Rating value={rating} />
      </div>
      <div className="">
        <span className="font-semibold mr-1">{author.username}</span>
        <span className="text-neutral-600">reviewed</span>
        <span className="font-semibold mx-1">{product}</span>
        <span className="text-neutral-600">on</span>
        <span className="font-semibold ml-1">
          {new Date(createdAt).toDateString()}
        </span>
      </div>
      <div>{body}</div>
    </div>
  );
}
