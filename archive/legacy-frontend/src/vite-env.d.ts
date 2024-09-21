/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_DISCORD_PROXY_HOST: string;
  readonly VITE_GITHUB_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
