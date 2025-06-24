
### composable
コンポサーブルとはVueのCompositionAPIを活用して再利用可能な状態やロジックを定義する機能
- 再利用可能なロジック:composableを利用すると，コンポーネント間で共有したいロジックや状態をモジュールとして定義し，それを簡単にインポートして使用可能
- 関数として定義:composableは通常，関数として定義され必要な状態やメソッドを返す。内部で状態管理や副作用を処理する
- 明示的な依存関係:composableを使うことで，依存関係が明示的になりどのロジックや状態がどのコンポーネントで使用されているかが明確になる

Nuxtでは `composable/` ディレクトリにcomposableなロジックを格納する

countを2倍にするロジック
```vue
<!--./app.vue -->
<script setup lang="ts">
const { count, doubled, increment } = useCounter()
</script>

<template>
  <div>
    <p>count is {{ count }}</p>
    <p>doubled is {{ doubled }}</p>
    <button type="button" @click="increment">
      +1
    </button>
  </div>
</template>
```

```typescript
//./composable/useCounter.ts
export function useCounter() {
  const count = ref(1)
  const doubled = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubled, increment }
}
```
