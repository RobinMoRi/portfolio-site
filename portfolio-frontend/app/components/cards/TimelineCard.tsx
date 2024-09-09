import { TimelineItemTitle } from "@/components/ui/timeline";
import { ReusableexperienceDocument } from "@/prismicio-types";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import React from "react";

const TimelineCard = ({
  experience,
}: {
  experience: ReusableexperienceDocument<string>;
}) => {
  console.log("end", experience.data.end);
  return (
    <div className="flex flex-col gap-2">
      <TimelineItemTitle>{experience.data.title}</TimelineItemTitle>
      <div className="text-slate-400">{experience.data.institute}</div>
      <div className="flex gap-2 text-slate-400 text-sm">
        <Calendar size={18} />
        <div>
          {format(new Date(String(experience.data.start)), "MMM. yyyy")} -{" "}
          {experience.data.end
            ? format(new Date(String(experience.data.end)), "MMM. yyyy")
            : "Ongoing"}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
