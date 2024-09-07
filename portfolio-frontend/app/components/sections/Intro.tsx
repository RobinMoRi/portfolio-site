"use client";
import useNavbarHeight from "@/app/hooks/useNavbarHeight";
import { Button } from "@/components/ui/button";
import { Section } from "@/types/navbar";
import { scrollToDivWithOffset } from "@/utils";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import SectionWrapper from "./SectionWrapper";

const Intro = () => {
  return (
    <SectionWrapper id={Section.Init} className="h-screen">
      <div className="section-intro__content h-full">
        <div className="section-intro__overlay h-full w-full flex flex-col items-center gap-4">
          <p className="tracking-widest text-3xl md:text-5xl mt-4 md:mt-16">
            ROBIN MORENO RINDING
          </p>
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
            <Button onClick={() => scrollToDivWithOffset(Section.AboutMe)}>
              <ChevronsDown />
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Intro;
