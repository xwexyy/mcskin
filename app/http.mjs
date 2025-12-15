import { CONFIG } from './config.mjs';

export async function api(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    CONFIG.timeoutMs
  );

  try {
    const res = await fetch(`${CONFIG.apiBase}${path}`, {
      ...options,
      headers: {
        'Authorization': `Bot ${CONFIG.token}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });

    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {}

    return { res, json };
  } finally {
    clearTimeout(timeout);
  }
}
