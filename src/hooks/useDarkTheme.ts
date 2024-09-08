import { useEffect, useState } from "react";

const useDarkTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 다크 모드 설정을 저장하고 불러올 수 있습니다.
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return {};
};

export default useDarkTheme;
