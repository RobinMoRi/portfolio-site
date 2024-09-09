"use client";
import { useCallback, useEffect, useState } from "react";

function useNavbarHeight() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  const calculateNavbarHeight = useCallback(() => {
    const navbar = document.getElementById("navbar-container");
    if (navbar) {
      console.debug({ navbarHeight: navbar.offsetHeight });
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    calculateNavbarHeight();

    window.addEventListener("resize", calculateNavbarHeight);

    return () => window.removeEventListener("resize", calculateNavbarHeight);
  }, [calculateNavbarHeight]);

  return navbarHeight;
}

export default useNavbarHeight;
