import NavBanner from "./navLogo";
import NavBar from "./navBar";

const Navigator = () => {
  return (
    <div className="fixed top-0 h-fit w-full">
      <NavBanner />
      <NavBar />
    </div>
  );
};

export default Navigator;
