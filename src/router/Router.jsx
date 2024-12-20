import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Home from "../pages/Home";
import CreateBlog from "../pages/CreateBlog";

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
        path: "/createBlog",
        element: <CreateBlog></CreateBlog>,
      },
    ],
  },
]);

export default router;
