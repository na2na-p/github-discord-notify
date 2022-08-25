declare module 'process' {
  global {
    const process: NodeJS.Process;
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        SECRET?: string
        DISCORD_WEBHOOK_URL?: string
				DISCOED_AVATAR_URL?: string
				DISCORD_BOTNAME?: string
        PORT?: string
				/**
				 * ## FOR DEBUG USE ONLY!!!!
				 */
				SMEE_PROXY_URL?: string
      }
    }
  }
  export = process
}
