// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../hooks/useAxiosPublic";
import PageTitle from "./../components/PageTitle";
import { Link } from "react-router-dom";
import useAllBlog from "../hooks/useAllBlog";
import { useEffect } from "react";

const AllBlog = () => {
  const { data: allBlog, isLoading, isError, error, refetch } = useAllBlog();

  //   Scroll From Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="px-0 lg:px-8 container mx-auto">
      <PageTitle
        heading={"All Blogs"}
        subHeading={
          "Discover curated articles, tips, and stories across diverse topics to spark curiosity, inspire learning, and keep you engaged."
        }
      ></PageTitle>

      <div className="mt-10">
        {isLoading ? (
          <div className="flex flex-col gap-4" data-aos="fade-up">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ) : isError ? (
          // Error State
          <div className="text-red-500 text-center" data-aos="fade-up">
            <div role="alert" className="alert">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <p>
                Something went wrong while generating suggestions.
                {error?.response?.data?.error ? (
                  <p>{error.response.data.error}</p>
                ) : (
                  <p>{error?.message || "An unexpected error occurred."}</p>
                )}
              </p>
              <button
                onClick={() => {
                  refetch();
                }}
                className="button-style"
              >
                Reload
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {Array.isArray(allBlog) && allBlog.length > 0 ? (
              allBlog?.map((blog, idx) => (
                <div key={idx} className="min-h-full" data-aos="fade-up">
                  <div className="flex  flex-col gap-4 h-full">
                    <div className="card card-bg-color h-full shadow-xl">
                      <div className="p-6 space-y-2 flex flex-col justify-between h-full">
                        <div className="space-y-2">
                          <h2 className="text-lg lg:text-xl font-semibold">
                            {blog?.title}
                          </h2>
                          <p className="text-xs lg:text-base font-light">
                            {blog?.subtitle}
                          </p>
                          <p className="font-medium text-wrap">
                            {blog?.description?.split(" ").length >= 25
                              ? blog?.description
                                  ?.split(" ")
                                  .slice(0, 25)
                                  .join(" ")
                              : blog?.description}
                            ...........
                          </p>
                        </div>
                        <div className="card-actions">
                          <Link
                            to={`/allBlog/${blog._id}`}
                            className="button-style"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="accentColor"  data-aos="fade-up">No available blog</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
