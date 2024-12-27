import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://gen-ai-blog-server.vercel.app",
});
const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;
