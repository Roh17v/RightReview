import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

interface Review {
  body: string;
  product: string;
  rating: number;
  createdAt: string;
  author: {
    username: string;
  };
}

export default function ReviewPage() {
  const { id } = useParams();

  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch("/api/review/" + id);
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        window.location.href = "/";
      }
      console.log(data);
      setReview(data);
    };
    fetchReview();
    return () => setReview(null);
  }, [id]);

  if (!review) {
    return <div>Fetching Review ...</div>;
  }

  return (
    <div>
      <ReviewCard {...review} />
    </div>
  );
}
