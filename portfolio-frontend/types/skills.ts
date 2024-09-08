import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Skill {
  label: string;
  icon: IconDefinition;
  iconColor?: string;
  backgroundColor?: string;
}

export type Skills = Skill[];
