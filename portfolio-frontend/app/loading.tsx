import SvgImage from "@/app/assets/robin.svg";
import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-primary">
      <div>
        <SvgImage />
      </div>
    </div>
  );
}
