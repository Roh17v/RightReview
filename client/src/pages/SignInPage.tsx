import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function SignInPage() {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    setMessage(null);
    event.preventDefault();
    const body = { email, password };
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    }
    if (data.message) {
      setMessage(data.message);
      window.location.href = "/";
    }
  };

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form
        onSubmit={onFormSubmit}
        className="bg-white p-4 shadow flex flex-col gap-2"
      >
        <div className="text-center text-xl font-semibold mb-4">Sign In</div>
        <input
          autoComplete="off"
          onChange={onEmailChange}
          className="border rounded px-4 py-2"
          placeholder="Email"
          type="text"
          name="email"
          value={email}
        />
        <input
          autoComplete="off"
          onChange={onPasswordChange}
          className="border rounded px-4 py-2"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
        />
        <input
          className="mt-4 bg-blue-600 text-white rounded px-2 py-2"
          type="submit"
          value="Sign In"
        />
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
        <p className="mt-3">
          Don't Have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
