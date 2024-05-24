import Banner from "../../Components/Banner/Banner";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import Header from "../../Components/Header/Header";
import HrLine from "../../Components/HrLine/HrLine";
import "./Home.module.css";

function Home() {
  return (
    <div>
      <Header />
      <ExploreMenu />
      <HrLine />
      <Banner />
    </div>
  );
}

export default Home;
