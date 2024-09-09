import { Section } from "@/types/navbar";

import Image from "next/image";
import React from "react";
import NavigateToSectionButton from "../buttons/NavigateToSectionButton";
import SectionWrapper from "./SectionWrapper";

const Intro = () => {
  return (
    <SectionWrapper id={Section.Init}>
      <div className="section-intro__content h-[calc(100vh-73px-40px)]">
        <div className="section-intro__overlay h-full w-full flex flex-col items-center gap-4">
          <div className="md:mt-16 typewriter">
            <h1 className="tracking-widest text-3xl md:text-5xl">
              ROBIN MORENO RINDING
            </h1>
          </div>
          <p className="tracking-wide text-slate-200 md:text-slate-400">
            Fullstack Developer | Tech Enthusiast | Lifelong Learner
          </p>
          <div className="flex items-center justify-center">
            <Image
              src="/robin.svg"
              width={240}
              height={240}
              alt="Robin Moreno Rinding"
              className="rounded-full shadow-md "
            />
          </div>
          <div className="h-full flex items-end p-8">
            <NavigateToSectionButton />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Intro;
