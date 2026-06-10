#!/bin/sh
set -e

db_path="${DATABASE_PATH:-local.db}"

if [ ! -f "$db_path" ]; then
  echo "Database not found at $db_path — running db:reset"
  npm run db:reset
fi

exec "$@"
