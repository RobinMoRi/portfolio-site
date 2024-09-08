import React from "react";

const SkillsContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-w-full bg-slate-900 rounded-lg p-4">
      <div className="text-lg mb-4">{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export default SkillsContainer;
