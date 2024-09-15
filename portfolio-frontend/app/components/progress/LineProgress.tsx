import React from "react";

export interface DataPoint {
  lang: string;
  color: string;
  width: number;
}

interface LineProgressProps {
  dataPoints: DataPoint[];
}

const LineProgress = ({ dataPoints }: LineProgressProps) => {
  return (
    <div className="flex h-1 min-w-full rounded-sm overflow-hidden">
      {dataPoints.map((point, index) => {
        return (
          <div
            key={`${point.color}-${index}`}
            style={{
              backgroundColor: point.color,
              width: `${point.width * 100}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export default LineProgress;
