import { Section } from "@/types/navbar";
import React from "react";
import SectionWrapper from "./SectionWrapper";

const AboutMe = () => {
  return (
    <SectionWrapper id={Section.AboutMe} className="h-full" title="About Me">
      <AboutMeContent />
      <div className="md:max-w-prose">
        <p>
          With a master's degree in mechatronics and robotics from the Royal
          Institute of Technology, I come most recently from Morpheus Tribe,
          where I work as a fullstack developer.
        </p>
        <p>
          I have over 4 years of hands-on experience working with a diverse
          range of technologies, encompassing web development, business process
          automation, data analytics, and test development.
        </p>
        <p>
          What truly sets me apart is my unwavering passion for fullstack
          development. I am not just content with my existing knowledge; I am
          always eager to learn more and delve deeper into this ever-evolving
          field.
        </p>
        <p>
          Outside of my professional life, I find great joy in running,
          especially over long distances. In addition to this, I have a deep
          love for hitting the gym, traveling and exploring everything related
          to food.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default AboutMe;

import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";

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
