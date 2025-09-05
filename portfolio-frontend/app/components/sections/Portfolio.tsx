import { fetchLanguages, fetchRepos } from "@/lib/api/github";
import { Section } from "@/types/navbar";
import React from "react";

import SectionWrapper from "./SectionWrapper";
import PortfolioClient from "./PortfolioClient";

async function getRepos() {
  try {
    const data = await fetchRepos();
    const sortedRepos = data
      .filter((repo) => repo.name !== "RobinMoRi")
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    const repoWithLanguagesPromises = sortedRepos.map(async (repo) => {
      const languages = await fetchLanguages(repo.languages_url);
      return { ...repo, languages };
    });

    const reposWithLanguages = await Promise.all(repoWithLanguagesPromises);

    return reposWithLanguages;
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
}

const Portfolio = async () => {
  const repos = await getRepos();
  if (!repos) return <div className="text-center p-2">Repos not found</div>;
  return (
    <SectionWrapper id={Section.Portfolio} className="h-full" title="Portfolio">
      <PortfolioClient repos={repos} />
    </SectionWrapper>
  );
};

export default Portfolio;
