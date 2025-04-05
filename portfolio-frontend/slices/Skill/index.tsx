import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Skill`.
 */
export type SkillProps = SliceComponentProps<Content.SkillSlice>;

/**
 * Component for "Skill" Slices.
 */
const Skill = ({ slice }: SkillProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for skill (variation: {slice.variation}) Slices
    </section>
  );
};

export default Skill;
