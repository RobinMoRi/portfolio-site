import api from "./api";

type Languages = { [key: string]: number };
export type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  languages_url: string;
  languages: Languages;
  created_at: string;
};

export type Repos = Repo[];

export async function fetchRepos(client = false): Promise<Repo[]> {
  return api.fetchApi<Repos>({
    path: api.GITHUB_REPOS,
    method: "GET",
    client,
  });
}

export async function fetchLanguages(
  languagesUrl: string,
  client: boolean = false
): Promise<Languages> {
  return api.fetchApi<Languages>({
    path: api.GITHUB_LANGUAGES(languagesUrl),
    method: "GET",
    client,
  });
}
