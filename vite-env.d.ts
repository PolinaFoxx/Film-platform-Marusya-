/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />  // ← ЭТО КЛЮЧЕВОЕ

interface ImportMetaEnv {
  readonly VITE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
