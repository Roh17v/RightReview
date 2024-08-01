import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setMessage(null); // Clear previous messages

    try {
      const response = await axios.post("/api/auth/signup", formData);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setMessage(
          "Account created successfully! Redirecting to sign-in page..."
        );
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Email already exists"
      ) {
        setError("Email already exists. Please use a different email.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className=" w-full h-screen flex items-center justify-center bg-neutral">
      <div className="p-8 rounded shadow-lg max-w-lg lg:max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block font-medium mb-2 text-gray-700"
            >
              Username
            </label>
            <input
              type="username"
              placeholder="Enter your Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
          {error && (
            <div
              className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {message && (
            <div
              className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success: </strong>
              <span className="block sm:inline">{message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
