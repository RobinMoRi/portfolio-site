"use client";
import { Repos } from "@/lib/api/github";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import RepoCard from "../cards/RepoCard";
import { scrollToDivWithOffset } from "@/utils";
import { Section } from "@/types/navbar";

function PortfolioClient({ repos }: { repos: Repos }) {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {repos
          .filter((el, idx) => showAll || idx < 4)
          .map((repo) => {
            return <RepoCard key={repo.id} repo={repo} />;
          })}
      </div>
      <div className="w-full flex justify-center">
        <Button
          className="w-full md:w-auto mt-2"
          onClick={() => {
            setShowAll(!showAll);
            scrollToDivWithOffset(Section.Portfolio);
          }}
        >
          {showAll ? "Show less" : "View all"}
        </Button>
      </div>
    </>
  );
}

export default PortfolioClient;
