import { getAccessTokenFromCookies } from "@/utils/cookies/getAccessTokenFromCookies";
import HeaderInner from "./headerInner";

const Header = () => {
  const cookie = getAccessTokenFromCookies("tokenOnly");

  return <HeaderInner isAuthenticated={!!cookie} />;
};

export default Header;
