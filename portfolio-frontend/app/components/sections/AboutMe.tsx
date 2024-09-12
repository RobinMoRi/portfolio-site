import { Section } from "@/types/navbar";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import React from "react";
import SectionWrapper from "./SectionWrapper";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function AboutMeContent() {
  const client = createClient();
  const page = await client.getSingle("aboutme");

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("aboutme");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

const AboutMe = () => {
  return (
    <SectionWrapper id={Section.AboutMe} className="h-full" title="About Me">
      <div className="md:max-w-prose">
        <AboutMeContent />
      </div>
    </SectionWrapper>
  );
};

export default AboutMe;
