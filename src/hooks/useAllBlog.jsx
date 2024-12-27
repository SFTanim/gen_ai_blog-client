import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useAllBlog = (id) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      if (id) {
        const res = await axiosSecure.get(`/blog/${id}`);
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
