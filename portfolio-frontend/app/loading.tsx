import Image from "next/image";
import React from "react";
import PageProgress from "./components/progress/PageProgress";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-primary">
      {/* <PageProgress /> */}
      Loading...
    </div>
  );
}
