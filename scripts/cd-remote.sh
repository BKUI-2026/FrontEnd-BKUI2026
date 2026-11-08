#!/usr/bin/env bash
set -euo pipefail

COMPOSE_DIR="${COMPOSE_DIR:-/opt/bkui-api}"
cd "$COMPOSE_DIR"

exec 9>/tmp/bkui-deploy.lock
flock 9

grep -q "image: bkui-web:latest" docker-compose.yml || {
  echo "docker-compose.yml di server belum punya image bkui-web. Deploy BE dulu."
  exit 1
}

pulihkan() {
  docker image inspect bkui-web:sebelum >/dev/null 2>&1 && docker tag bkui-web:sebelum bkui-web:latest
  docker compose up -d --no-build web
}

cek_web() {
  docker compose exec -T web node -e "fetch('http://127.0.0.1:3001').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
}

echo "==> Simpan versi yang sedang jalan"
ID=$(docker compose ps -q web)
[ -n "$ID" ] && docker tag "$(docker inspect -f '{{.Image}}' "$ID")" bkui-web:sebelum

echo "==> Build"
docker compose build web

echo "==> Jalankan"
if ! docker compose up -d --no-build web; then
  echo "!! Gagal start, kembali ke versi sebelumnya"
  pulihkan
  exit 1
fi

echo "==> Health check"
for _ in $(seq 1 40); do
  if cek_web >/dev/null 2>&1; then
    docker image prune -f >/dev/null
    docker builder prune -f --filter until=168h >/dev/null
    docker compose ps --format '{{.Service}}  {{.Status}}'
    echo "==> Deploy FE selesai"
    exit 0
  fi
  sleep 3
done

echo "!! Health check gagal, kembali ke versi sebelumnya"
docker compose logs --tail 80 web || true
pulihkan
exit 1
