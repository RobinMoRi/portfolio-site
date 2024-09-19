import api from "./api";

export interface DiscordInitSessionData {
  name: string;
  phone: string;
  email: string;
  message: string;
  meta: string;
}

export interface DiscordInitSessionResponse {
  id: string;
  name: string;
  message_count: number;
}

export interface DiscordCreateMessageData {
  message: string;
  thread_id: string;
  meta: boolean;
}

export interface Embed {
  type: string;
  title: string;
  content_scan_version: number;
}

export interface Author {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  bot?: boolean;
  banner: string;
  accent_color: string;
  global_name: string;
  avatar_decoration_data: unknown;
  banner_color: string;
  clan: string;
}

export interface DiscordMessage {
  id: string;
  type: number;
  content: string;
  embeds: Embed[];
  timestamp: string;
  edited_timestamp: string;
  author: Author;
}

export type DiscordMessagesReponse = DiscordMessage[];

export async function loginToThread(
  loginId: string,
  client: boolean = false
): Promise<string> {
  return api.fetchApi<string>({
    path: api.DISCORD_LOGIN(loginId),
    method: "POST",
    client,
  });
}

export async function getLoginId(
  threadId: string,
  client: boolean = false
): Promise<string> {
  return api.fetchApi<string>({
    path: api.DISCORD_KEY(threadId),
    method: "GET",
    client,
  });
}

export async function initSession(
  data: DiscordInitSessionData,
  client: boolean = false
): Promise<DiscordInitSessionResponse> {
  return api.fetchApi<DiscordInitSessionResponse, DiscordInitSessionData>({
    path: api.DISCORD_INIT,
    method: "POST",
    client,
    body: data,
  });
}

export async function createMessage(
  data: DiscordCreateMessageData,
  client: boolean = false
): Promise<null> {
  return api.fetchApi<null, DiscordCreateMessageData>({
    path: api.DISCORD_MESSAGE,
    method: "POST",
    client,
    body: data,
  });
}

export async function getMessages(
  threadId: string,
  client: boolean = false
): Promise<DiscordMessagesReponse> {
  return api.fetchApi<DiscordMessagesReponse>({
    path: api.DISCORD_MESSAGES(threadId),
    method: "GET",
    client,
  });
}
