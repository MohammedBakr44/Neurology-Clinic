#!/bin/sh
set -e

cd /app

echo "Installing dependencies..."
bun install --ignore-scripts

echo "Starting TanStack Start..."
cd /app/apps/web
exec bun run dev --host 0.0.0.0

