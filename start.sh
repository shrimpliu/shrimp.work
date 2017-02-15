#!/usr/bin/env bash
export NODE_ENV=production

pm2 stop shrimp.work
pm2 start index.js --name shrimp.work
