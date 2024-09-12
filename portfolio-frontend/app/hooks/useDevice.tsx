import { useMediaQuery } from "react-responsive";

const useDevice = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)", //From tailwind: https://tailwindcss.com/docs/screens
  });
  return { isDesktopOrLaptop };
};

export default useDevice;

// 'sm': '640px',
// // => @media (min-width: 640px) { ... }

// 'md': '768px',
// // => @media (min-width: 768px) { ... }

// 'lg': '1024px',
// // => @media (min-width: 1024px) { ... }

// 'xl': '1280px',
// // => @media (min-width: 1280px) { ... }

// '2xl': '1536px',
// // => @media (min-width: 1536px) { ... }
