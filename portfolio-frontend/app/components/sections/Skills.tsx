import { Section } from "@/types/navbar";
import React from "react";
import SkillCard from "../cards/SkillCard";
import SectionWrapper from "./SectionWrapper";

import {
  faDocker,
  faGitAlt,
  faJava,
  faJs,
  faNodeJs,
  faPython,
  faReact,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faBrain,
  faChartSimple,
  faChessKnight,
  faCircleNodes,
  faCode,
  faComments,
  faDatabase,
  faPeopleGroup,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

import { Skills as SkillsType } from "@/types/skills";
import SkillsContainer from "../cards/SkillsContainer";

const techSkills: SkillsType = [
  { icon: faPython, label: "Python" },
  { icon: faJs, label: "JS/TS" },
  { icon: faReact, label: "React" },
  { icon: faVuejs, label: "Vue" },
  { icon: faCode, label: "Django/DRF" },
  { icon: faGitAlt, label: "Git" },
  { icon: faScrewdriverWrench, label: "Esbuild" },
  { icon: faDatabase, label: "PostgreSQL" },
  { icon: faDocker, label: "Docker" },
  { icon: faChartSimple, label: "SKLearn" },
  { icon: faCode, label: "Celery" },
  { icon: faNodeJs, label: "Nodejs" },
];

const softSkills: SkillsType = [
  { icon: faChartSimple, label: "Analytical" },
  { icon: faCircleNodes, label: "Adaptable" },
  { icon: faPeopleGroup, label: "Team player" },
  { icon: faBrain, label: "Problem solver" },
  { icon: faBook, label: "Curious about learning" },
  { icon: faChessKnight, label: "Business acumen" },
  { icon: faComments, label: "Communicative" },
];

const Skills = () => {
  return (
    <SectionWrapper id={Section.Skills} className="h-full" title="Skills">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkillsContainer title="Technical Skills">
          {techSkills.map((skill) => {
            return (
              <SkillCard
                key={skill.label}
                label={skill.label}
                icon={skill.icon}
              />
            );
          })}
        </SkillsContainer>
        <SkillsContainer title="Soft Skills">
          {softSkills.map((skill) => {
            return (
              <SkillCard
                key={skill.label}
                label={skill.label}
                icon={skill.icon}
              />
            );
          })}
        </SkillsContainer>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
