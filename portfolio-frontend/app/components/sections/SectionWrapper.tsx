import useNavbarHeight from "@/app/hooks/useNavbarHeight";
import { Section } from "@/types/navbar";
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className: string;
  id: string;
}
const SectionWrapper = ({ children, className, id }: SectionWrapperProps) => {
  const navbarHeight = useNavbarHeight();
  return (
    <div
      id={id}
      className={`${className} px-2 md:px-20 lg:px-52`}
      style={{
        paddingTop: id === Section.Init ? navbarHeight : 0,
      }}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
