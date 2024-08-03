interface Props {
  value: number;
}

export default function Rating({ value }: Props) {
  let starColorClass;
  if (value <= 2) {
    starColorClass = "bg-red-500";
  } else if (value > 4) {
    starColorClass = "bg-green-600";
  } else if (value == 4) {
    starColorClass = "bg-[#32CD32]";
  } else {
    starColorClass = "bg-orange-500";
  }
  return (
    <div className="flex gap-1">
      {Array(value)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`${starColorClass} flex items-center justify-center p-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path d="M10 1l2.38 6.14 6.62.58-5.12 4.73 1.21 6.55-6.09-3.21-6.09 3.21 1.21-6.55-5.12-4.73 6.62-.58z" />
            </svg>
          </div>
        ))}
      {Array(5 - value)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="bg-gray-300 flex items-center p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path d="M10 1l2.38 6.14 6.62.58-5.12 4.73 1.21 6.55-6.09-3.21-6.09 3.21 1.21-6.55-5.12-4.73 6.62-.58z" />
            </svg>
          </div>
        ))}
    </div>
  );
}
