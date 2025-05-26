#!/bin/bash

TARGET="${1:-.}"
EXCLUDED_DIRS=(.git node_modules dist build .next .expo coverage)
EXCLUDED_FILES=("*.log" "*.lock")

IGNORED_DIRS_FOUND=()

print_tree() {
  local dir="$1"
  local prefix="$2"

  local entries=()
  while IFS= read -r entry; do
    basename=$(basename "$entry")

    # 除外対象ディレクトリかどうか
    for ex in "${EXCLUDED_DIRS[@]}"; do
      if [[ "$basename" == "$ex" ]]; then
        IGNORED_DIRS_FOUND+=("$entry")
        continue 2
      fi
    done

    # 除外対象ファイルかどうか
    for pattern in "${EXCLUDED_FILES[@]}"; do
      if [[ "$basename" == $pattern ]]; then
        continue 2
      fi
    done

    entries+=("$entry")
  done < <(find "$dir" -mindepth 1 -maxdepth 1 | sort)

  local total=${#entries[@]}
  local count=0

  for entry in "${entries[@]}"; do
    count=$((count + 1))
    local name=$(basename "$entry")
    local connector="├──"
    [[ $count -eq $total ]] && connector="└──"

    echo "${prefix}${connector} $name"

    if [[ -d "$entry" ]]; then
      local new_prefix="$prefix"
      [[ $count -eq $total ]] && new_prefix+="    " || new_prefix+="│   "
      print_tree "$entry" "$new_prefix"
    fi
  done
}

# 実行
echo "${TARGET}/"
print_tree "$TARGET"

# 除外されたディレクトリ一覧を表示
if [[ ${#IGNORED_DIRS_FOUND[@]} -gt 0 ]]; then
  echo
  echo "🔻 除外されたディレクトリ:"
  for ignored in "${IGNORED_DIRS_FOUND[@]}"; do
    echo " - $(basename "$ignored")"
  done
fi