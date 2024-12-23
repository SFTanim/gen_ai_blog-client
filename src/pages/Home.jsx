import { useEffect } from "react";
import Banner from "../components/home/Banner";

const Home = () => {
  //   Scroll From Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <div className="">
        <Banner></Banner>
      </div>
      <div className="container mx-auto"></div>
    </div>
  );
};

export default Home;
