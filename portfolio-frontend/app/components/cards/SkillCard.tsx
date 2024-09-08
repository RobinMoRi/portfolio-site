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
  backgroundColor = "bg-slate-700",
}: SkillCardProps) => {
  return (
    <div
      className={`${backgroundColor} w-24 h-24 hover:bg-slate-400/50 rounded-md flex flex-col gap-1 items-center justify-center cursor-pointer p-2`}
    >
      <FontAwesomeIcon
        size="2xl"
        icon={icon}
        className={`fa-fw ${iconColor}`}
        color="slate-500"
      />
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
};

export default SkillCard;
