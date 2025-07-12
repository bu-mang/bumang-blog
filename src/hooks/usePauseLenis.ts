import { useEffect } from "react";

const usePauseLenis = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
};

export default usePauseLenis;
