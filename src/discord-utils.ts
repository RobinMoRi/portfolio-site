const DISCORD_PROXY_HOST = import.meta.env.VITE_DISCORD_PROXY_HOST;

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
  attachments: any[];
  embeds: any[];
  mentions: Author[];
  mention_roles: any[];
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  timestamp: Date;
  edited_timestamp: null;
  flags: number;
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
  name: string
): Promise<CreateThreadResponse> {
  const url = `${DISCORD_PROXY_HOST}/startNewThread?name=${name}`;

  return fetch(url, {
    method: "POST",
  }).then((res) => res.json());
}

export async function addBotToThread(thread_id: string): Promise<null> {
  const url = `${DISCORD_PROXY_HOST}/addBotToThread?thread_id=${thread_id}`;

  return fetch(url, {
    method: "PUT",
  }).then((res) => res.json());
}

export async function createThreadMessage(
  thread_id: string,
  message: string,
  meta: boolean = false
): Promise<GetThreadMessageResponse> {
  let url = `${DISCORD_PROXY_HOST}/createThreadMessage?thread_id=${thread_id}&message=${message}`;

  if (meta) {
    url += `&meta=True`;
  }

  return fetch(url, {
    method: "POST",
  }).then((res) => res.json());
}

export async function getThreadMessages(
  thread_id: string
): Promise<GetThreadMessageResponse[]> {
  const url = `${DISCORD_PROXY_HOST}/getThreadMessages?thread_id=${thread_id}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}

// FIXME: should not be inside of here but it is using same proxy
type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  languages_url: string;
  languges: string[];
  created_at: string;
};

type Languages = { [key: string]: number };

export async function fetchRepos(): Promise<Repo[]> {
  const url = `${DISCORD_PROXY_HOST}/getGithubRepos`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}

export async function fetchLanguages(languagesUrl: string): Promise<Languages> {
  const url = `${DISCORD_PROXY_HOST}/getGithubLanguages?url=${languagesUrl}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}
