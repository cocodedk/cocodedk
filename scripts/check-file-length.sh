#!/usr/bin/env bash
# Check that source files stay under the max line limit.
# Usage:
#   scripts/check-file-length.sh          # check all tracked files
#   scripts/check-file-length.sh --staged  # check only staged files (pre-commit)
#   scripts/check-file-length.sh --changed # check files changed vs main (CI)

MAX_LINES=200
EXTENSIONS="js ts css html"
EXIT_CODE=0

if [ "$1" = "--staged" ]; then
  FILES=$(git diff --cached --name-only --diff-filter=ACM)
elif [ "$1" = "--changed" ]; then
  BASE=$(git merge-base HEAD origin/main 2>/dev/null || echo "HEAD~1")
  FILES=$(git diff --name-only --diff-filter=ACM "$BASE" HEAD)
else
  FILES=$(git ls-files)
fi

for ext in $EXTENSIONS; do
  for file in $(echo "$FILES" | grep "\.$ext$"); do
    [ -f "$file" ] || continue
    lines=$(wc -l < "$file")
    if [ "$lines" -gt "$MAX_LINES" ]; then
      echo "FAIL: $file has $lines lines (max $MAX_LINES)"
      EXIT_CODE=1
    fi
  done
done

if [ "$EXIT_CODE" -eq 0 ]; then
  echo "All files within $MAX_LINES line limit."
fi

exit $EXIT_CODE
