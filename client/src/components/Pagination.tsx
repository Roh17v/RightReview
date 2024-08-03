interface PaginationProps {
  currentPage: number;
  handlePageChange: (page: number) => void;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  handlePageChange,
  totalPages,
}: PaginationProps) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex w-full justify-center relative left-1/2 transform -translate-x-1/2 mt-5">
      <div
        className={`border border-solid border-gray-400 flex items-center justify-center p-2 ${
          currentPage == 1 ? "opacity-50" : ""
        }`}
      >
        <button
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M15.78 3.22a.75.75 0 00-1.06 0L7.22 10.72a.75.75 0 000 1.06l7.5 7.5a.75.75 0 001.06-1.06L9.31 11l6.47-6.47a.75.75 0 000-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      {pages.map((page, index) => (
        <div
          key={index}
          className={`border border-solid border-gray-400 ${
            currentPage == page ? "" : "opacity-50"
          }`}
        >
          <button onClick={() => handlePageChange(page)} className={`p-3`}>
            {page}
          </button>
        </div>
      ))}
      <div
        className={`border border-solid border-gray-400 flex items-center justify-center p-2 ${
          currentPage == totalPages ? "opacity-50" : ""
        }`}
      >
        <button
          onClick={() => {
            if (currentPage != totalPages) {
              handlePageChange(currentPage + 1);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M8.22 3.22a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 11 8.22 4.53a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
