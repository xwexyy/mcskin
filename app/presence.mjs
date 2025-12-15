import WebSocket from 'ws';
import { CONFIG } from './config.mjs';
import { log } from './logger.mjs';

export function connectGateway() {
  const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

  ws.on('open', () => {
    log('Discord Gateway bağlandı (bot ONLINE)');
  });

  ws.on('message', data => {
    const payload = JSON.parse(data);
    if (payload.op === 10) {
      ws.send(JSON.stringify({
        op: 2,
        d: {
          token: CONFIG.token,
          intents: 0,
          properties: {
            os: 'linux',
            browser: 'spinner',
            device: 'spinner'
          }
        }
      }));
    }
  });

  ws.on('close', () => {
    log('Gateway kapandı, yeniden bağlanıyor...');
    setTimeout(connectGateway, 5000);
  });
}
