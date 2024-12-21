import { useParams } from "react-router-dom";
import useAllBlog from "../hooks/useAllBlog";
import { useEffect } from "react";

const BlogDetails = () => {
  const id = useParams().id;

  //   Scroll From Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: allBlog, isLoading } = useAllBlog(id);

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
          <div className="card bg-base-100 h-full shadow-xl">
            <div className="p-6 space-y-2 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <h2 className="text-lg lg:text-3xl font-semibold">
                  {allBlog?.title}
                </h2>
                <p className="text-xs lg:text-base font-light">
                  {allBlog?.subtitle}
                </p>
                <p className="font-medium text-wrap">{allBlog?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
