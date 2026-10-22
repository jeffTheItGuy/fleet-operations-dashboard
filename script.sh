#!/usr/bin/env bash
# genericize-frontend.sh — strip Zimbabwe identifiers from frontend modules
# Run from the frontend/ directory (where src/ lives).
#
#   DRY_RUN=1 ./genericize-frontend.sh   # preview unified diffs
#   ./genericize-frontend.sh             # apply (creates timestamped backup dir)

set -uo pipefail

SRC_DIR="${SRC_DIR:-src}"
DRY_RUN="${DRY_RUN:-0}"
BACKUP_DIR="frontend-cleanup-backup-$(date +%Y%m%d-%H%M%S)"

[[ "$DRY_RUN" != "1" ]] && mkdir -p "$BACKUP_DIR"

# Order matters: compound phrases and place-name specifics come BEFORE
# the generic word-boundary substitutions that would eat their pieces.
SED_EXPR=(
  # --- compound phrases first ---
  -e 's/Dell Zimbabwe/Dell Inc./g'

  # --- Zimbabwe place names that appear in this codebase ---
  -e 's/\bChitungwiza\b/Southside/g'
  -e 's/\bBorrowdale\b/Northside/g'
  -e 's/\bMbare\b/Westside/g'
  -e 's/\bHighfield\b/Eastside/g'
  -e 's/\bKuwadzana\b/Northwest/g'
  -e 's/Victoria Falls/Northern Depot/g'

  # "Head Office, Harare" -> "Head Office"; bare Harare -> "City Centre"
  # (also turns route names like 'Harare-CBD' into 'City Centre-CBD')
  -e 's/, Harare//g'
  -e 's/\bHarare\b/City Centre/g'

  # --- country / agency / currency terms ---
  -e 's/\bZimbabwean\b/Southern African/gI'
  -e 's/\bZimbabwe\b/Southern Africa/gI'
  -e 's/\bZIMRA\b/the revenue authority/gI'
  -e 's/\bZIM\b/the operator/gI'
  -e 's/\bZIG\b/the local currency/gI'
)

PREVIEW_PATTERN='Harare|Chitungwiza|Borrowdale|Mbare|Highfield|Kuwadzana|Victoria Falls|Zimbabwe|ZIMRA|\bZIM\b|\bZIG\b'

FILES=()
while IFS= read -r f; do FILES+=("$f"); done \
  < <(grep -rilE "$PREVIEW_PATTERN" "$SRC_DIR" 2>/dev/null)

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No matching files under $SRC_DIR — nothing to do."
  exit 0
fi

echo "Files containing Zimbabwe identifiers:"
printf '  %s\n' "${FILES[@]}"
echo

for f in "${FILES[@]}"; do
  tmp="$(mktemp)"
  sed -E "${SED_EXPR[@]}" -- "$f" > "$tmp"

  if cmp -s -- "$f" "$tmp"; then
    echo "unchanged:  $f"
    rm -f "$tmp"
    continue
  fi

  if [[ "$DRY_RUN" == "1" ]]; then
    echo "── would change: $f ──"
    diff -u -- "$f" "$tmp" | sed -n '1,80p'
    echo
    rm -f "$tmp"
  else
    cp -- "$f" "$BACKUP_DIR/"
    mv -- "$tmp" "$f"
    echo "changed:    $f"
  fi
done

if [[ "$DRY_RUN" != "1" ]]; then
  echo
  echo "Backups: $BACKUP_DIR"
  echo "Leftover check:"
  grep -rinE "$PREVIEW_PATTERN" "$SRC_DIR" 2>/dev/null || echo "  none — clean"
fi