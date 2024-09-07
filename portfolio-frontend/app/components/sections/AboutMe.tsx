"use client";
import { Section } from "@/types/navbar";
import React from "react";
import SectionWrapper from "./SectionWrapper";

const AboutMe = () => {
  return (
    <SectionWrapper id={Section.AboutMe} className="h-full">
      <div className="h-full">About Me</div>
    </SectionWrapper>
  );
};

export default AboutMe;
