import { Section } from "@/types/navbar";
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className: string;
  title?: string;
  id: string;
}
const SectionWrapper = ({
  children,
  className,
  id,
  title,
}: SectionWrapperProps) => {
  return (
    <div
      id={id}
      className={`${className} px-2 md:px-20 lg:px-52`}
      style={{
        paddingTop: id === Section.Init ? "72px" : 0,
      }}
    >
      <div className="pt-10 max-h-full overflow-scroll">
        {title ? <div className="text-5xl pb-6">{title}</div> : null}
        {children}
      </div>
    </div>
  );
};

export default SectionWrapper;
