# README

## これはなに？
格ゲーチェッカー 様のイベントテーブルをiCal形式に変換するスクリプト

## 使い方
ts-nodeで実行

```bash
ts-node exec.ts
``` 
## 結果
同階層に出力される
出力先はexec.ts``const filePath ``で指定される

```ical
BEGIN:VCALENDAR
VERSION:2.0
PRODID:kakuge-checker iCalender
BEGIN:VEVENT
DTSTART;TZID=Asia/Tokyo:20250325T0000
DTEND;TZID=Asia/Tokyo:20250325T0100
SUMMARY:漫画雑誌『月刊ビッグガンガン』発売日 ※ハイスコアガール DASH連載誌
発売日
END:VEVENT
BEGIN:VEVENT
DTSTART;TZID=Asia/Tokyo:20250325T1400
DTEND;TZID=Asia/Tokyo:20250325T1500
SUMMARY:LEGENDUS スト6 最強道場決定戦 2日目
スト6イベント
大会
...
END:VEVENT
END:VCALENDAR

```

## 今後の予定
- コードを綺麗にする
- 拡張機能かなんかにする
- 出力先を確認，指定できるようにする
- 重複して出力されないようにする