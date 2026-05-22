#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

cp -r public .next/standalone/
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/static

rm -rf deploy-bundle
mkdir -p deploy-bundle
cp -r .next/standalone/* deploy-bundle/

echo "Deploy bundle ready in deploy-bundle/"
