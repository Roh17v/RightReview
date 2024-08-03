import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import NavBar from "./components/NavBar.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { useEffect, useState } from "react";
import PostReviewPage from "./pages/PostReviewPage.tsx";
import ReviewPage from "./pages/ReviewPage.tsx";
import SignUp from "./pages/SignUpPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <ReviewPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/post",
    element: <PostReviewPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/user");
      const data = await response.json();
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
    return () => setUser(null);
  }, []);

  return (
    <AuthProvider value={{ user }}>
      <NavBar />
      <div className="w-full flex justify-center py-2 mt-16">
        <div className="w-full px-9">
          <RouterProvider router={router} />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
