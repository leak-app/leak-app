#!/bin/sh
# Writes /env.js from container env so the SPA can be configured without a rebuild.
# The nginx image runs every script in /docker-entrypoint.d/ on start.
set -eu

json_escape() {
  printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'
}

API_BASE_URL="${API_BASE_URL:-/api}"
GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID:-}"

cat > /usr/share/nginx/html/env.js <<EOF
window.__APP_CONFIG__ = {
  apiBaseUrl: "$(json_escape "$API_BASE_URL")",
  googleClientId: "$(json_escape "$GOOGLE_CLIENT_ID")"
};
EOF
