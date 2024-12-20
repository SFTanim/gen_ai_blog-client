import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PageTitle from "../components/PageTitle";

const CreateBlog = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <DotLottieReact
        src="https://lottie.host/7ee26a40-3808-4826-a1a5-de8af7083974/73w9BXYyAY.lottie"
        loop
        autoplay
        className="w-full lg:w-1/3 flex-1 mt-10 lg:mt-0"
      />{" "}
      <div className="flex-1">
        <PageTitle
          heading={"Blog Creations Hub"}
          subHeading={"Create your blog effortlessly with the power of AI."}
        ></PageTitle>
      </div>
    </div>
  );
};

export default CreateBlog;
