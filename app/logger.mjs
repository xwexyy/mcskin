export function log(msg) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${msg}`);
}

export function error(msg) {
  const ts = new Date().toISOString();
  console.error(`[${ts}] ERROR: ${msg}`);
}
