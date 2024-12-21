import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllBlog = (id) => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      if (id) {
        console.log("id fom useallblog: ", id);
        const res = await axiosPublic.get(`/blog/${id}`);
        return res.data;
      } else {
        const res = await axiosPublic.get("/blogs");
        return res.data;
      }
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useAllBlog;
