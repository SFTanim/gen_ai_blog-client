import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const UsePostBlog = ({ input }) => {
  const axiosPublic = useAxiosPublic();
  const { isPending, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.post("/api/suggest", {
        input,
      });
      return res.data;
    },
  });
  return {isPending, data};
};

export default UsePostBlog;
