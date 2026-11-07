#!/usr/bin/env bash
set -euo pipefail

SERVER="${BKUI_SERVER:-ubuntu@43.173.14.84}"
KUNCI="${BKUI_SSH_KEY:-$HOME/.ssh/bkui_vps_ed25519}"
TUJUAN="/opt/bkui-web"
COMPOSE_DIR="/opt/bkui-api"

AKAR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$AKAR"

echo "==> Mengirim kode FE ke $SERVER"
ssh -i "$KUNCI" "$SERVER" "sudo mkdir -p $TUJUAN && sudo chown \$(id -u):\$(id -g) $TUJUAN"
rsync -az --delete \
  -e "ssh -i $KUNCI -o ConnectTimeout=30" \
  --exclude node_modules \
  --exclude .git \
  --exclude .next \
  --exclude '.env*' \
  --exclude '*.tsbuildinfo' \
  ./ "$SERVER:$TUJUAN/"

echo "==> Build ulang & jalankan web"
ssh -i "$KUNCI" "$SERVER" "cd $COMPOSE_DIR && sudo docker compose build web && sudo docker compose up -d web && sudo docker compose up -d --force-recreate caddy"

echo "==> Status"
sleep 8
ssh -i "$KUNCI" "$SERVER" "cd $COMPOSE_DIR && sudo docker compose ps --format '{{.Service}}  {{.Status}}'"
ssh -i "$KUNCI" "$SERVER" "sudo docker image prune -f >/dev/null && echo bersih"
