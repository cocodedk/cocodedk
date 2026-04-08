#!/usr/bin/env bash
# Deploy dist/ to one.com via SFTP
# Requires: sshpass, SFTP_PASS env var (or ~/.cocode-sftp-pass file)
set -euo pipefail

SFTP_USER="cocode.dk"
SFTP_HOST="ssh.cocode.dk"
DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$DIR/dist"

# Load password from env or file
if [ -z "${SFTP_PASS:-}" ]; then
  PASS_FILE="$HOME/.cocode-sftp-pass"
  if [ -f "$PASS_FILE" ]; then
    SFTP_PASS="$(cat "$PASS_FILE")"
  else
    echo "ERROR: Set SFTP_PASS env var or create $PASS_FILE"
    exit 1
  fi
fi
export SSHPASS="$SFTP_PASS"

# Build if dist/ doesn't exist or --build flag
if [ ! -d "$DIST_DIR" ] || [ "${1:-}" = "--build" ]; then
  echo "Building project..."
  (cd "$DIR" && npm run build)
fi

if [ ! -d "$DIST_DIR" ]; then
  echo "ERROR: dist/ not found after build"
  exit 1
fi

echo "Deploying to one.com ($SFTP_HOST)..."

SFTP_OPTS="-o StrictHostKeyChecking=no -o PreferredAuthentications=password -o PubkeyAuthentication=no"

# Build sftp commands: create dirs then put files
CMDS=""

# Create remote directories
while IFS= read -r dir; do
  [ "$dir" = "." ] && continue
  CMDS+="mkdir ${dir#./}"$'\n'
done < <(cd "$DIST_DIR" && find . -type d | sort)

# Upload files
while IFS= read -r file; do
  local_path="$DIST_DIR/${file#./}"
  remote_path="${file#./}"
  CMDS+="put \"$local_path\" \"$remote_path\""$'\n'
done < <(cd "$DIST_DIR" && find . -type f | sort)

CMDS+="bye"

# Upload via sftp heredoc (proven approach)
echo "$CMDS" | sshpass -e sftp $SFTP_OPTS "${SFTP_USER}@${SFTP_HOST}" 2>&1 | \
  grep -v "Couldn't create directory" | grep -v "^sftp>" || true

echo "Deploy complete!"
