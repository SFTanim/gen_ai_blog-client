import { useParams } from "react-router-dom";
import useAllBlog from "../hooks/useAllBlog";
import { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BlogDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const id = useParams().id;
  const { data: blog, isLoading, refetch,isError, error } = useAllBlog(id);

  //   Scroll From Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLike = (id) => {
    const blogId = id;
    axiosSecure.post(`/blogLike/${user?.email}/${blogId}`).then((res) => {
      if (res?.data?.acknowledged) {
        refetch();
      }
    });
  };

  const handleDisike = (id) => {
    const blogId = id;
    axiosSecure.post(`/blogDislike/${user?.email}/${blogId}`).then((res) => {
      if (res?.data?.acknowledged) {
        refetch();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4 mx-auto">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }
  if (isError) {
    return (
      <div role="alert" className="alert alert-warning bg-transparent max-w-[1100px] mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current text-red-600"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="accentColor">Warning: {error?.message}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-[1100px] mx-auto">
        <div className="flex  flex-col gap-4 h-full">
          <div className="card p-6 bg-base-100 h-full shadow-xl">
            <div className="mb-4 flex gap-3 justify-evenly lg:justify-start">
              <div className="flex items-center">
                {blog?.userImage ? (
                  <div tabIndex={0} role="button" className="">
                    <img
                      className="w-9 rounded-full"
                      src={blog?.userImage || ""}
                      alt="Profile"
                    />
                  </div>
                ) : (
                  <div tabIndex={0} role="button" className="text-4xl mr-2">
                    <FaRegUserCircle />
                  </div>
                )}
              </div>
              <div className="py-2">
                <h2 className="font-bold text-lg lg:text-2xl">
                  {blog?.userName}
                </h2>
                <h2 className="font-light">{blog?.userEmail}</h2>
              </div>
            </div>
            <div className="flex flex-col justify-between h-full ">
              <div className="space-y-2">
                <h2 className="text-xl lg:text-3xl font-semibold">
                  {blog?.title}
                </h2>
                <p className="text-xs lg:text-base font-extralight">
                  {blog?.subtitle}
                </p>
                <p className="font-medium text-wrap">{blog?.description}</p>
              </div>
            </div>
            <div className="text-3xl flex gap-3 justify-end mt-4">
              {Array.isArray(blog.like) && blog.like.includes(user?.email) ? (
                <div className="flex items-center gap-2">
                  <button
                    className="accentColor"
                    onClick={() => handleLike(blog?._id)}
                  >
                    <SlLike />
                  </button>
                  <h2 className="text-lg">{blog?.like?.length}</h2>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button className="" onClick={() => handleLike(blog?._id)}>
                    <SlLike />
                  </button>
                  <h2 className="text-lg">{blog?.like?.length}</h2>
                </div>
              )}

              {Array.isArray(blog.like) &&
              blog.dislike.includes(user?.email) ? (
                <div className="flex items-center gap-2">
                  <button
                    className="accentColor"
                    onClick={() => handleDisike(blog?._id)}
                  >
                    <SlDislike />
                  </button>
                  <h2 className="text-lg">{blog?.dislike?.length}</h2>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button className="" onClick={() => handleDisike(blog?._id)}>
                    <SlDislike />
                  </button>
                  <h2 className="text-lg">{blog?.dislike?.length}</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
