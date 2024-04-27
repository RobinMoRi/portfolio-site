// TODO: Move to environment variables
const DISCORD_PROXY_HOST = "http://localhost:8001";

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

export function startNewThread(name: string): Promise<CreateThreadResponse> {
  const url = `${DISCORD_PROXY_HOST}/startNewThread?name=${name}`;

  return fetch(url, {
    method: "POST",
  }).then((res) => res.json());
}

export function addBotToThread(thread_id: string): Promise<null> {
  const url = `${DISCORD_PROXY_HOST}/addBotToThread?thread_id=${thread_id}`;

  return fetch(url, {
    method: "PUT",
  }).then((res) => res.json());
}

export function createThreadMessage(thread_id: string, message: string) {
  const url = `${DISCORD_PROXY_HOST}/createThreadMessage?thread_id=${thread_id}&message=${message}`;

  return fetch(url, {
    method: "POST",
  }).then((res) => res.json());
}
