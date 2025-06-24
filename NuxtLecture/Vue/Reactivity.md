
### Reactivity
- vueはデータの変更を監視して変更されたときに更新を自動的にトリガーする
- `ref`,`computed`,`watch`
    - `ref()`:単一の値を保持するためのコンテナ。値が更新された時は自動的に追跡。値は`.value`で参照
    - `computed()`:getter関数からの返り値を反映したrefオブジェクトを返す
```vue
<!--ボタンを押すと値が1増えるcountとmultiの積を表示する-->

<script setup lang="ts">
  const count = ref(1)
  const multi = ref(2)

  const doubled = computed(() => count.value * 2)
  const multied = computed(() => multi.value * count.value)

  function increment() {
    count.value++
  }
  function incrementMulti() {
    multi.value++
  }
</script>

<template>
  <div>
    <p>count is {{ count }}</p>
    <p>count({{ count }})*2 is {{ doubled }}</p>
    <p>multi is {{ multi }}</p>
    <p>count({{ count }})*multi({{ multi }}) is {{ multied }}</p>
    <button type="button" @click="increment">
      count:+1
    </button>
    <button type="button" @click="incrementMulti">
      multi:+1
    </button>
  </div>
</template>
```

- `watch()` : リアクティブなデータの変化を監視して変化があったときに特定の処理を行う
    - computedど同様にリアクティブ値の変化に応じて作用するが，`console`や`fetch`など主に副作用をリアクティブに実行する

```vue
<script setup lang="ts">
const id = ref(1)
//idの初期値が"1"

const loading = ref(false)
// loadingの初期値"false"

const data = ref<{
  userId: number
  id: number
  title: string
  completed: boolean
} | null>(null)
//dataの型はnullableな{userID,id,title,completed}で初期値はnull

function increment() {
  id.value++
}

async function fetchTodo() {
  loading.value = true
  //loadingを"true"に変える
  
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id.value}`)
    data.value = await res.json()
  }
  //idの値に対応した https://jsonplaceholder.typicode.com/todos/${id.value} をresに渡してjson形式にしたものをdataに代入
  
  finally {
    loading.value = false
  }
  //最後になったらloadingの値をfalseに変える
}

watch(id, fetchTodo, { immediate: true })
//watch(source,callback,option)
  //監視する変数，変数を代入する関数，オプション
  //immediateオプション:変化する前の値，初期値を代入するときはtrue.今回だとhttps://jsonplaceholder.typicode.com/todos/1 を表示している
  
</script>

<template>
  <div>
    <p>ID: {{ id }}</p>
    <button type="button" :disabled="loading" @click="increment">
      次の TODO アイテムを取得
    </button>
    <p v-if="loading">
      <!-- v-if="loading":loading=trueの時-->
      Loading...
    </p>
    <pre v-else>{{ data }}</pre>
  </div>
</template>
```

stateにidとdataとloadingをまとめると

```vue
<script setup lang="ts">
  const id = ref(1)

  const loading = ref(false)

  const data = ref<{
    userId: number
    id: number
    title: string
    completed: boolean
  } | null>(null)

  function increment() {
    id.value++
  }

  async function fetchTodo() {
    loading.value = true
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id.value}`)
      data.value = await res.json()
    }
    finally {
      loading.value = false
    }
  }

  watch(id, fetchTodo, { immediate: true })
</script>

<template>
  <div>
    <p>ID: {{ id }}</p>
    <button type="button" :disabled="loading" @click="increment">
      次の TODO アイテムを取得
    </button>
    <p v-if="loading">
      Loading...
    </p>
    <pre v-else>{{ data }}</pre>
  </div>
</template>

```
