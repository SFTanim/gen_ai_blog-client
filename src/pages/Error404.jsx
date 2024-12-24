import { Link, useRouteError } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Error404 = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col lg:flex-row mt-16 items-center">
      <div className="flex-1">
        <DotLottieReact
          src="https://lottie.host/02227f68-64df-4323-84ed-de82ef287cf0/hQcyGYepMf.lottie"
          loop
          autoplay
        />
      </div>
      <div className=" flex-1 space-y-2 text-center lg:text-left px-4 lg:px-0">
        <h1 className="text-5xl font-semibold accentColor">Oops!</h1>
        <p className="text-2xl font-bold">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-2xl font-semibold">
          <i>{error?.status}</i> - <i>{error?.statusText || error?.message}</i>
        </p>
        <div className="pt-2">
          {" "}
          <Link className="button-style2" to={"/"}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
