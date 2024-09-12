import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import { createClient } from "@/prismicio";
import { Section } from "@/types/navbar";
import { filter } from "@prismicio/client";
import { FileDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import TimelineCard from "../cards/TimelineCard";
import SectionWrapper from "./SectionWrapper";

const TimelinePrismic = async ({
  tag,
  title,
}: {
  tag: string;
  title: string;
}) => {
  const client = createClient();
  const experiences = await client.getAllByType("reusableexperience", {
    filters: [filter.any("document.tags", [tag])],
  });

  const sortedExperiences = experiences.sort((a, b) => {
    if (a.data.start === null || b.data.start === null) return -1;
    if (a.data.end === null && b.data.end !== null) return -1;
    if (a.data.end !== null && b.data.end === null) return 1;

    return b.data.start.localeCompare(a.data.start);
  });
  const items = sortedExperiences.map((el) => {
    return { children: <TimelineCard experience={el} /> };
  });

  const activeIndex = sortedExperiences.findIndex((el) => el.data.active);

  return (
    <div>
      <div className="mb-4 text-lg">{title}</div>
      <Timeline items={items} activeItem={activeIndex}></Timeline>
    </div>
  );
};

const Resume = () => {
  return (
    <SectionWrapper id={Section.Resume} className="h-full" title="Resume">
      <div className="mb-4">
        <Button>
          <Link
            className="flex gap-2 items-center"
            href="https://drive.usercontent.google.com/uc?id=1PvwN_ImQx2JK-es-hp2kAd3qv87IHzLI&export=download" //TOOD: move to prismic
            target="_blank"
          >
            <FileDown />
            Download CV
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <TimelinePrismic tag="work-experience" title="Work Experience" />
        </div>
        <div>
          <TimelinePrismic tag="education" title="Education" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Resume;
