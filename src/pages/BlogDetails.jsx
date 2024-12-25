import { useParams } from "react-router-dom";
import useAllBlog from "../hooks/useAllBlog";
import { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const BlogDetails = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const id = useParams().id;
  const { data: blog, isLoading, refetch } = useAllBlog(id);

  //   Scroll From Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLike = (id) => {
    const blogId = id;
    axiosPublic.post(`/blogLike/${user?.email}/${blogId}`).then((res) => {
      if (res?.data?.acknowledged) {
        refetch();
      }
    });
  };

  const handleDisike = (id) => {
    const blogId = id;
    axiosPublic.post(`/blogDislike/${user?.email}/${blogId}`).then((res) => {
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
