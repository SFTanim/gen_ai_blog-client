import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
]);

export default router;
