#!/usr/bin/env bash
export NODE_ENV=production

pm2 startOrReload pm2.json
