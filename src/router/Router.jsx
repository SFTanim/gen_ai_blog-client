import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Home from "../pages/Home";
import CreateBlog from "../pages/CreateBlog";
import AllBlog from "../pages/AllBlog";
import BlogDetails from "../pages/BlogDetails";
import Login from './../components/shared/Login';
import SignUp from './../components/shared/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
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
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/createBlog",
        element: <CreateBlog></CreateBlog>,
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
