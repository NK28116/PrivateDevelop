#!/bin/bash

# 共通部分のパスを入力
read -p "共通部分: " base_path

# 作成する相対パスを入力（例: a/a.json b/b.json）
read -p "作成するディレクトリ/ファイル: " paths

# 空白で分割して配列に
IFS=' ' read -r -a items <<< "$paths"

# 各ファイルを作成
for path in "${items[@]}"; do
  full_path="${base_path}${path}"
  mkdir -p "$(dirname "$full_path")"
  touch "$full_path"
done

# 完了メッセージと確認
echo "作成完了: $base_path 以下に以下の内容を作成しました"
ls -R "$base_path"
