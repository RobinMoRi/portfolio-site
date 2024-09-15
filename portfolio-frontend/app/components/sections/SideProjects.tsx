"use client";
import { createClient } from "@/prismicio";
import { Section } from "@/types/navbar";
import React from "react";
import SideProjectCard from "../cards/SideProjectCard";
import SectionWrapper from "./SectionWrapper";

const SideProjectPrismic = async () => {
  const client = createClient();
  const sideProjects = await client.getAllByType("sideproject");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {sideProjects.map((project) => {
        return <SideProjectCard key={project.uid} sideProject={project} />;
      })}
    </div>
  );
};

const SideProjects = () => {
  return (
    <SectionWrapper
      id={Section.SideProjects}
      className="h-full"
      title="Side Projects"
    >
      <SideProjectPrismic />
    </SectionWrapper>
  );
};

export default SideProjects;
