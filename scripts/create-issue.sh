#!/usr/bin/env bash
set -euo pipefail

# Create a GitHub issue from a bilingual (EN / JA) markdown file.
#
# The first "# Heading" line of the file is used as the issue title; the rest
# (below that line) is the issue body.
#
# Usage:
#   scripts/create-issue.sh <file.md> [-l label1,label2] [-d]
#
#   <file.md>  Path to the markdown file (title = first "# " line, body = rest)
#   -l         Comma-separated labels (optional; must already exist in the repo)
#   -d         Dry run: print the title/body/command without creating the issue
#   -h         Show this help
#
# Requires the GitHub CLI (`gh`), authenticated via `gh auth login`.

usage() {
  sed -n '3,19p' "$0" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

body_file=""
labels=""
dry_run=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    -l) labels="${2:-}"; shift 2 ;;
    -d) dry_run=true; shift ;;
    -h) usage 0 ;;
    -*) echo "Error: unknown option $1." >&2; usage 1 ;;
    *)  body_file="$1"; shift ;;
  esac
done

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: GitHub CLI (gh) is not installed." >&2
  exit 1
fi
if [[ -z "$body_file" ]]; then
  echo "Error: a markdown file is required." >&2
  usage 1
fi
if [[ ! -f "$body_file" ]]; then
  echo "Error: file not found: $body_file" >&2
  exit 1
fi

title="$(grep -m1 '^# ' "$body_file" | sed 's/^# //')"
if [[ -z "$title" ]]; then
  echo "Error: no title found. Add a '# Title' line to $body_file." >&2
  exit 1
fi

# Body = everything after the first "# " title line.
body="$(awk 'seen { print } /^# /{ seen=1 }' "$body_file")"

if $dry_run; then
  echo "== DRY RUN =="
  echo "Title : $title"
  echo "Labels: ${labels:-(none)}"
  echo "---- body ----"
  echo "$body"
  exit 0
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Error: not authenticated. Run 'gh auth login' first." >&2
  exit 1
fi

args=(--title "$title" --body "$body")
if [[ -n "$labels" ]]; then
  args+=(--label "$labels")
fi

gh issue create "${args[@]}"
