#!/usr/bin/env bash
# Prüft alle Beispiele: npm ci, Type Check, Tests, Build (plus Lösung und Storybook, falls vorhanden).
# Aufruf: ./scripts/check-all.sh [beispiel …]
set -euo pipefail
cd "$(dirname "$0")/../examples"

examples=("$@")
if [ ${#examples[@]} -eq 0 ]; then
  examples=(*/)
fi

logdir="${TMPDIR:-/tmp}/introduction-react-check"
mkdir -p "$logdir"
failed=()
for example in "${examples[@]}"; do
  example="${example%/}"
  echo "▶ $example"
  if (
    cd "$example"
    npm ci --no-audit --no-fund --loglevel=error
    npm run typecheck
    npm test
    npm run build
    npm run build:solution --if-present
    npm run build-storybook --if-present -- --quiet
  ) >"$logdir/$example.log" 2>&1; then
    echo "  ✓ ok"
  else
    echo "  ✗ fehlgeschlagen, Log: $logdir/$example.log"
    failed+=("$example")
  fi
done

if [ ${#failed[@]} -gt 0 ]; then
  echo "Fehlgeschlagen: ${failed[*]}"
  exit 1
fi
echo "Alle ${#examples[@]} Beispiele sind grün."
