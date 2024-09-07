"use client";
import { Section } from "@/types/navbar";
import React from "react";
import SectionWrapper from "./SectionWrapper";

const Resume = () => {
  return (
    <SectionWrapper id={Section.Resume} className="h-full">
      <div className="h-full">Resume</div>
    </SectionWrapper>
  );
};

export default Resume;
