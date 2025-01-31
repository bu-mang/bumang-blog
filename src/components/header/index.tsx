import NavBanner from "./navLogo";
import NavBar from "./navBar";

const Header = () => {
  return (
    <div className="fixed top-0 z-[100] h-fit w-full">
      <NavBanner />
      <NavBar />
    </div>
  );
};

export default Header;
