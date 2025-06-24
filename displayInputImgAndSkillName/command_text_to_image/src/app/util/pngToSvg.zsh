#!/bin/zsh

if [[ $# -ne 2 ]]; then
  echo "使い方: $0 <InputDir> <OutputDir>"
  exit 1
fi

INPUT_DIR="$1"
OUTPUT_DIR="$2"
mkdir -p "$OUTPUT_DIR"

for file in "$INPUT_DIR"/*.png(.N); do
  filename="${file:t:r}"
  echo "変換中: $file → $OUTPUT_DIR/$filename.svg"
  # headlessモード + 標準のCLI変換（TraceBitmapではない）
  inkscape "$file" \
    --export-type=svg \
    --export-filename="$OUTPUT_DIR/$filename.svg"
done

#!usage: ./pngToSvg.zsh ../public/png/directionVector/ ../public/svg/directionVector/