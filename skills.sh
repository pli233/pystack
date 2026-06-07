#!/usr/bin/env bash
set -euo pipefail

TARGET="."
REPO_URL="${PYSTACK_REPO_URL:-https://github.com/pli233/pystack.git}"
REF="${PYSTACK_REF:-main}"

usage() {
  cat <<'USAGE'
PyStack skills installer

Usage:
  ./skills.sh [--target <dir>]
  curl -fsSL https://raw.githubusercontent.com/pli233/pystack/main/skills.sh | bash -s -- --target .

Environment:
  PYSTACK_REPO_URL  Override repository URL
  PYSTACK_REF       Override git ref, default: main
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target)
      TARGET="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

mkdir -p "$TARGET"
TARGET="$(cd "$TARGET" && pwd)"

if [[ -f "./bin/pystack.js" && -d "./skills" && -d "./upstream" ]]; then
  node ./bin/pystack.js init --target "$TARGET"
  exit 0
fi

TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/pystack-install.XXXXXX")"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

git clone --depth 1 --branch "$REF" "$REPO_URL" "$TMP_DIR/pystack"
node "$TMP_DIR/pystack/bin/pystack.js" init --target "$TARGET"
