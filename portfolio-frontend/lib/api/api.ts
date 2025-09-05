const CLIENT_HOST = process.env.NEXT_PUBLIC_CLIENT_HOST || "";
const SERVER_HOST =
  process.env.NEXT_PUBLIC_SERVER_HOST || "http://api-prod:8080";

const API_BASE = "/api/v1";
const LOCATION = (long: string, lat: string) =>
  `${API_BASE}/location/name?long=${long}&lat=${lat}`;

const GITHUB = `${API_BASE}/github`;
const GITHUB_REPOS = `${GITHUB}/repos`;
const GITHUB_LANGUAGES = (url: string) => `${GITHUB}/languages?url=${url}`;

const DISCORD_THREAD = `${API_BASE}/discord/thread`;
const DISCORD_KEY = (thread_id: string) =>
  `${DISCORD_THREAD}/key?thread_id=${thread_id}`;

const DISCORD_LOGIN = (login_id: string) =>
  `${DISCORD_THREAD}/login?login_id=${login_id}`;

const DISCORD_INIT = `${DISCORD_THREAD}/init`;
const DISCORD_MESSAGE = `${DISCORD_THREAD}/message`;
const DISCORD_MESSAGES = (thread_id: string) =>
  `${DISCORD_THREAD}/messages?thread_id=${thread_id}`;

const fetchApi = async <T, B = undefined>({
  path,
  method,
  client = false,
  body,
}: {
  path: string;
  method: "GET" | "PUT" | "POST";
  client?: boolean;
  body?: B;
}): Promise<T> => {
  let HOST = SERVER_HOST;
  if (client) {
    HOST = CLIENT_HOST;
  }

  const url = HOST ? `${HOST}${path}` : `${path}`;
  console.info(`[fetchApi] Fetching data from: ${url}`);
  const options: RequestInit = {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.debug(`[fetchApi] successful`);

  return data as T;
};

const exports = {
  LOCATION,
  GITHUB_REPOS,
  GITHUB_LANGUAGES,
  DISCORD_KEY,
  DISCORD_LOGIN,
  DISCORD_INIT,
  DISCORD_MESSAGE,
  DISCORD_MESSAGES,
  fetchApi,
};
export default exports;
