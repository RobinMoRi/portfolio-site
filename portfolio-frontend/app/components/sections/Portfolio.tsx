import { fetchLanguages, fetchRepos } from "@/lib/api";
import { Section } from "@/types/navbar";
import React from "react";
import RepoCard from "../cards/RepoCard";
import SectionWrapper from "./SectionWrapper";

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
  if (!repos) return <div>Repos not found</div>;
  return (
    <SectionWrapper id={Section.Portfolio} className="h-full" title="Portfolio">
      <div className="grid gap-2 grid-cols-4">
        {repos.map((repo) => {
          return <RepoCard key={repo.id} repo={repo} />;
        })}
      </div>
    </SectionWrapper>
  );
};

export default Portfolio;
