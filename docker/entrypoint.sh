#!/bin/sh
set -e

cd /app

MODE="${DEPLOY_MODE:-${1:-dev}}"

if [ "${1:-}" = "render" ]; then
  shift
fi

case "$MODE" in
  render)
    echo "Running in render mode..."
    ;;
  *)
    echo "Installing dependencies..."
    bun install --ignore-scripts
    ;;
esac

echo "Starting TanStack Start..."
cd /app/apps/web
case "$MODE" in
  render)
    exec bun run start
    ;;
  *)
    exec bun run dev --host 0.0.0.0
    ;;
esac
