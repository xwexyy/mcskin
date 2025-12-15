#!/usr/bin/env node
import { spawn } from 'node:child_process';
import process from 'node:process';

const child = spawn(
  'node',
  ['app/index.mjs'],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  }
);

child.on('exit', code => {
  process.exit(code ?? 0);
});
