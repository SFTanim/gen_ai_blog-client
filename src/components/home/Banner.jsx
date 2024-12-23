const Banner = () => {
  return (
    <div className="border relative">
      <div className="hero min-h-screen relative z-10">
        <div className="text-center">
          <div className="mx-4 lg:mx-0">
            <h1 className="mb-5 text-2xl lg:text-4xl font-bold">
              Turn Ideas into Blogs Instantly with
            </h1>
            <h1 className="mb-5 text-6xl lg:text-7xl font-bold lobsterFont">
              Ai
            </h1>
            <p className="mb-5 max-w-xl mx-auto text-sm">
              Boost your creativity and productivity with our AI-powered writing
              tool. Instantly transform your ideas into engaging blogs. Say
              goodbye to writer&apos;s block and hello to effortless content
              creation!
            </p>
            <button className="button-style2 uppercase">Write Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
