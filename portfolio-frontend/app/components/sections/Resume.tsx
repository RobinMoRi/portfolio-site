import { Timeline, TimelinePropsItem } from "@/components/ui/timeline";
import { Section } from "@/types/navbar";
import React from "react";
import SectionWrapper from "./SectionWrapper";

const events: TimelinePropsItem[] = [
  {
    title: "hejehe",
    children: <div>hej</div>,
  },
  {
    title: "hejehe",
    children: <div>hej</div>,
  },
  {
    title: "hejehe",
    children: <div>hej</div>,
  },
];

const Resume = () => {
  return (
    <SectionWrapper id={Section.Resume} className="h-full" title="Resume">
      <Timeline items={events} activeItem={0}></Timeline>
    </SectionWrapper>
  );
};

export default Resume;
