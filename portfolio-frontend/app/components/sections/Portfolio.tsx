"use client";
import { Section } from "@/types/navbar";
import React from "react";
import SectionWrapper from "./SectionWrapper";

const Portfolio = () => {
  return (
    <SectionWrapper id={Section.Portfolio} className="h-full">
      <div className="h-full">Portfolio</div>
    </SectionWrapper>
  );
};

export default Portfolio;
