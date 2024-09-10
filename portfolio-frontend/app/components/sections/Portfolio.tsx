import { fetchLanguages, fetchRepos } from "@/lib/api";
import { Section } from "@/types/navbar";
import React from "react";
import SectionWrapper from "./SectionWrapper";

// async function getRepos() {
//   const data = await fetchRepos();
//   const sortedRepos = data
//     .filter((el) => el.name !== "RobinMoRi")
//     .sort((a, b) => {
//       const aDate = new Date(a.created_at).getTime();
//       const bDate = new Date(b.created_at).getTime();
//       return bDate - aDate;
//     });

//   for (let idx in sortedRepos) {
//     let repo = sortedRepos[idx];

//     fetchLanguages(repo.languages_url).then((lang) => {
//       sortedRepos[idx] = { ...repo, languges: Object.keys(lang) };
//     });
//   }
// }

async function getRepos() {
  try {
    const data = await fetchRepos();
    const sortedRepos = data
      .filter((repo) => repo.name !== "RobinMoRi")
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    // Fetch all languages concurrently
    const repoWithLanguagesPromises = sortedRepos.map(async (repo) => {
      const languages = await fetchLanguages(repo.languages_url);
      return { ...repo, languages: Object.keys(languages) };
    });

    // Wait for all language fetches to complete
    const reposWithLanguages = await Promise.all(repoWithLanguagesPromises);

    return reposWithLanguages; // Assuming you want to use this data somewhere
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
}

const Portfolio = async () => {
  const repos = await getRepos();
  if (!repos) return <div>Repos not found</div>;
  return (
    <SectionWrapper id={Section.Portfolio} className="h-full" title="Portfolio">
      {repos.map((el) => {
        return <div className="h-full">{el.name}</div>;
      })}
    </SectionWrapper>
  );
};

export default Portfolio;
