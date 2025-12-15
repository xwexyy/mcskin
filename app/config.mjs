export const CONFIG = {
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.GUILD_ID,
  vanity: process.env.VANITY,

  apiBase: 'https://discord.com/api/v10',

  intervalMs: 75,   // düşük gecikme – stabil
  timeoutMs: 2500,

  verbose: true
};

if (!CONFIG.token || !CONFIG.guildId || !CONFIG.vanity) {
  console.error('ENV eksik: DISCORD_TOKEN, GUILD_ID, VANITY');
  process.exit(1);
}
