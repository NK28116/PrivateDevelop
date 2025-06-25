# util
ロジックや汎用的な処理
| ディレクトリ               | 主な目的              | 例                                    |
| -------------------- | ----------------- | ------------------------------------ |
| `components/`        | 見た目（UI）の構築        | `<SkillCard />`, `<Button />`        |
| `util/` または `utils/` | 純粋な関数（状態を持たない）    | `formatDate()`, `loadSkills()`       |
| `hooks/`             | 状態や副作用を含むロジックの再利用 | `useFetchData()`, `useSkillSearch()` |

## 概要
画像関連のutl
## 各ファイルの機序

### loadSkillSet.ts
const skillJsons = loadJsonSkills('skillSet/SF6/Ryu/Normal');
// 画像は /svg/xxx から参照するので、CommandImagePath は文字列だけでOK

使用例
```
import { loadSkills } from './loadSkillSet';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ryuSkills = loadSkills('SF6', 'Ryu');
  const chunSkills = loadSkills('SF6', 'ChunLi');

  await prisma.command.createMany({
    data: [...ryuSkills, ...chunSkills],
  });

  console.log('Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

```

### imageUtl.tsx

#### 関数
- `generateImageList(inputArray: string): ImageItem[]`:
  入力された文字列を解析し、それに対応する画像アイテムのリストを生成します。

- `spiltInputArray(inputText: string): ImageItem[]`:
  入力された文字列を区切り文字で分割し、それに対応する画像アイテムのリストを生成します。

 console.log(generateImageList("234MK"))
  

  [LOG]: [{
  "value": "2",
  "image": "/2.png",
  "key": 0
}, {
  "value": "3",
  "image": "/3.png",
  "key": 1
}, {
  "value": "4",
  "image": "/4.png",
  "key": 2
}, {
  "value": "MK",
  "image": "/MK.png",
  "key": 3
}] 

console.log(spiltInputArray("a--bc"))
[LOG]: [{
  "value": "a",
  "image": "/a.png",
  "key": 0
}, {
  "value": "bc",
  "image": "/bc.png",
  "key": 1
}] 