# Public
静的なアセットを格納するための場所。
画像やフォントなど

## 画像
svg形式の画像を生成するためのURL
https://vectorizer.kiwi/ja

## ディレクトリ構成
```
public/
├── svg/
│   ├── directionVector/
│   │   ├── 623.svg
│   │   └── 236.svg
│   └── SF6/
│       ├── HighP.svg
│       └── LowP.svg
├── skillSet/
│   └── SF6/
│       └── Ryu/
│           ├── Normal/
│           │   └── Skill1.json
│           └── Special/
│               └── Skill2.json
...
```
### Json
```json
{
  "GameTitle": "SF6",
  "CharacterName": "リュウ",
  "Input": "236中P",
  "SkillName": "中昇竜拳",
  "CommandImagePath": ["directionVector/236.svg", "SF6/HighP.svg"],
  "HitParts": "Middle"
}

```