const CLIENT_HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;
const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST;

export interface CreateThreadResponse {
  id: string;
  type: number;
  last_message_id: null;
  flags: number;
  guild_id: string;
  name: string;
  parent_id: string;
  rate_limit_per_user: number;
  bitrate: number;
  user_limit: number;
  rtc_region: null;
  owner_id: string;
  thread_metadata: ThreadMetadata;
  message_count: number;
  member_count: number;
  total_message_sent: number;
  member: Member;
}

export interface Member {
  id: string;
  user_id: string;
  join_timestamp: Date;
  flags: number;
  muted: boolean;
  mute_config: null;
}

export interface ThreadMetadata {
  archived: boolean;
  archive_timestamp: Date;
  auto_archive_duration: number;
  locked: boolean;
  create_timestamp: Date;
  invitable: boolean;
}

export interface GetThreadMessageResponse {
  id: string;
  type: number;
  content: string;
  channel_id: string;
  author: Author;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachments: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  embeds: any[];
  mentions: Author[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mention_roles: any[];
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  timestamp: Date;
  edited_timestamp: null;
  flags: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: any[];
  position: number;
}

export interface Author {
  id: string;
  username: string;
  avatar: null | string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: null;
  accent_color: null;
  global_name: null;
  avatar_decoration_data: null;
  banner_color: null;
  bot?: boolean;
}

export async function startNewThread(
  name: string,
  client = false
): Promise<CreateThreadResponse> {
  let HOST = SERVER_HOST;
  if (client) {
    HOST = CLIENT_HOST;
  }
  const url = `${HOST}/startNewThread?name=${name}`;

  return fetch(url, {
    method: "POST",
  }).then((res) => res.json());
}

export async function addBotToThread(
  thread_id: string,
  client: boolean = false
): Promise<null> {
  let HOST = SERVER_HOST;
  if (client) {
    HOST = CLIENT_HOST;
  }
  const url = `${HOST}/addBotToThread?thread_id=${thread_id}`;

  return fetch(url, {
    method: "PUT",
  }).then((res) => res.json());
}

export async function createThreadMessage(
  thread_id: string,
  message: string,
  meta: boolean = false,
  client: boolean = false
): Promise<GetThreadMessageResponse> {
  let HOST = SERVER_HOST;
  if (client) {
    HOST = CLIENT_HOST;
  }
  let url = `${HOST}/createThreadMessage?thread_id=${thread_id}&message=${message}`;

  if (meta) {
    url += `&meta=True`;
  }

  return fetch(url, {
    method: "POST",
  }).then((res) => res.json());
}

export async function getThreadMessages(
  thread_id: string,
  client = false
): Promise<GetThreadMessageResponse[]> {
  let HOST = SERVER_HOST;
  if (client) {
    HOST = CLIENT_HOST;
  }
  const url = `${HOST}/getThreadMessages?thread_id=${thread_id}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}

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
  let HOST = SERVER_HOST;
  if (client) {
    HOST = CLIENT_HOST;
  }
  const url = `${HOST}/getGithubRepos`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}

export async function fetchLanguages(
  languagesUrl: string,
  client: boolean = false
): Promise<Languages> {
  let HOST = SERVER_HOST;
  if (client) {
    HOST = CLIENT_HOST;
  }
  const url = `${HOST}/getGithubLanguages?url=${languagesUrl}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}

export type GeoLocation = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road: string;
    isolated_dwelling?: string;
    city_district?: string;
    city: string;
    municipality: string;
    county: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
};

export async function fetchLocationFromLongLat({
  long,
  lat,
  client = false,
}: {
  long: string;
  lat: string;
  client?: boolean;
}): Promise<GeoLocation> {
  let HOST = SERVER_HOST;
  if (client) {
    HOST = CLIENT_HOST;
  }
  const url = `${HOST}/locationNameFromLongLat?long=${long}&lat=${lat}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}
