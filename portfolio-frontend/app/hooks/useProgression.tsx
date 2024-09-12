import { useCallback, useEffect, useState } from "react";
import useNavbarHeight from "./useNavbarHeight";

const useProgression = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const navbarHeight = useNavbarHeight();

  const onScroll = useCallback(() => {
    const scrollHeight = document.body.scrollHeight - navbarHeight;
    const windowHeight = window.innerHeight;
    const scrollY = Math.round(window.scrollY - navbarHeight);
    const percentageScroll = Math.round(
      ((windowHeight + scrollY) / scrollHeight) * 100
    );

    setScrollPercentage(scrollY === 0 ? scrollY : percentageScroll);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrollPercentage;
};

export default useProgression;
