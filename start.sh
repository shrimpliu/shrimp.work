#!/usr/bin/env bash
export NODE_ENV=production

pm2 start index.js --name shrimp.work
