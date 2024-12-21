import { useEffect } from "react";
import Banner from "../components/home/Banner";

const Home = () => {
  //   Scroll From Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Banner></Banner>
    </div>
  );
};

export default Home;
