"use client";
import { Section } from "@/types/navbar";
import React from "react";
import SectionWrapper from "./SectionWrapper";

const Skills = () => {
  return (
    <SectionWrapper id={Section.Skills} className="h-full">
      <div className="h-full">Skills</div>
    </SectionWrapper>
  );
};

export default Skills;
