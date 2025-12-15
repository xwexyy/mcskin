import { setTimeout as delay } from 'node:timers/promises';
import { CONFIG } from './config.mjs';
import { api } from './http.mjs';
import { log, error } from './logger.mjs';
import { connectGateway } from './presence.mjs';
connectGateway();

async function checkVanity(code) {
  const start = performance.now();
  const { res } = await api(`/invite/${encodeURIComponent(code)}`);
  const ms = Math.round(performance.now() - start);

  return {
    free: res.status === 404,
    ms
  };
}

async function claimVanity(code) {
  const start = performance.now();
  const { res, json } = await api(
    `/guilds/${CONFIG.guildId}/vanity-url`,
    {
      method: 'PATCH',
      body: JSON.stringify({ code })
    }
  );
  const ms = Math.round(performance.now() - start);

  return {
    ok: res.ok,
    status: res.status,
    json,
    ms
  };
}

log('Vanity URL spinner başlatıldı.');

while (true) {
  try {
    const check = await checkVanity(CONFIG.vanity);
    log(`CHECK free=${check.free} ${check.ms}ms`);

    if (check.free) {
      const claim = await claimVanity(CONFIG.vanity);
      log(`CLAIM status=${claim.status} ok=${claim.ok} ${claim.ms}ms`);

      if (claim.ok) {
        log('BAŞARILI – işlem tamamlandı.');
        process.exit(0);
      }
    }
  } catch (e) {
    error(e.message || e);
  }

  await delay(CONFIG.intervalMs);
}
