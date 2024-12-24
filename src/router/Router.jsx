import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Home from "../pages/Home";
import CreateBlog from "../pages/CreateBlog";
import AllBlog from "../pages/AllBlog";
import BlogDetails from "../pages/BlogDetails";
import Login from "./../components/shared/Login";
import SignUp from "./../components/shared/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Error404 from "../pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allBlog",
        element: <AllBlog></AllBlog>,
      },
      {
        path: "/allBlog/:id",
        element: (
          <ProtectedRoute>
            <BlogDetails></BlogDetails>
          </ProtectedRoute>
        ),
      },
      {
        path: "/createBlog",
        element: (
          <ProtectedRoute>
            <CreateBlog></CreateBlog>
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
