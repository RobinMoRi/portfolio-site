"use client";
import { Section } from "@/types/navbar";
import React from "react";
import SectionWrapper from "./SectionWrapper";

const SideProjects = () => {
  return (
    <SectionWrapper
      id={Section.SideProjects}
      className="h-full"
      title="Side Projects"
    >
      <div className="h-full">SideProjects</div>
    </SectionWrapper>
  );
};

export default SideProjects;
