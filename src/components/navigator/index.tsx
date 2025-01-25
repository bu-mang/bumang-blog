import NavBanner from "./navLogo";
import NavBar from "./navBar";

const Navigator = () => {
  return (
    <div className="fixed top-0 w-full bg-white">
      <NavBanner />
      <NavBar />
    </div>
  );
};

export default Navigator;
