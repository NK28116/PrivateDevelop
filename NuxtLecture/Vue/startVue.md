## Vue
nuxtはvueというUIを構築するためのフレームワーク

html.css,javascriptを一つにまとめたSFC(Vue Single File Component)を作成でき
```vue
<!--//JS(TS)を定義する script setup-->>
<script setup lang="ts">
// ref is auto imported by Nuxt
const count = ref(0)
</script>

<!--//htmｌを適宜する template-->
<template>
  <button type="button" @click="count++">
    Count is: {{ count }}
  </button>
</template>

<!--//cssを適宜する style-->
<style scoped>
button {
  font-weight: bold;
}
</style>
```
nuxtはvueユーティリティを自動インポートしてくれる
