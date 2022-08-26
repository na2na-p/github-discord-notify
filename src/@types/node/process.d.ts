declare module 'process' {
  global {
    const process: NodeJS.Process;
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
				NODE_ENV?: string | 'production';
        SECRET?: string
        DISCORD_WEBHOOK_URL?: string
				DISCORD_AVATAR_URL?: string
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
