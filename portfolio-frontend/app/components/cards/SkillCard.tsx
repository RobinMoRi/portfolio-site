import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SkillCardProps {
  label: string;
  icon: IconDefinition;
  iconColor?: string;
  backgroundColor?: string;
}

const SkillCard = ({
  label,
  icon,
  iconColor,
  backgroundColor = "bg-skillscard",
}: SkillCardProps) => {
  return (
    <div
      className={`${backgroundColor} w-28 h-28 md:w-32 md:h-32 hover:bg-slate-400/40 rounded-md flex flex-col gap-1 items-center justify-center cursor-pointer p-4 shadow-lg`}
    >
      <FontAwesomeIcon
        size="2xl"
        icon={icon}
        className={`fa-fw ${iconColor}`}
        color="slate-500"
      />
      <div className="text-sm text-slate-400 text-center">{label}</div>
    </div>
  );
};

export default SkillCard;
