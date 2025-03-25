
### component
UIを小さな再利用できる部分に分割するための基本単位
#### 再利用
`.vue`で定義したSFCは`<script setup>`でインポートできる
```vue
<script setup lang="ts">
import Child from './Child.vue'
</script>

<template>
  <Child />
</template>
```

#### データの受け渡し
データをやり取りする方法として`props`と`emit`がある
- `props`:**親コンポーネント** から**子コンポーネント**にデータを渡す
    - まずは子コンポーネント側で`defineProps`マクロを使用し，**受け取りたいデータ**を定義する
```vue
<!-- Child.vue -->
<script setup lang="ts">
  defineProps<{ message: string }>()
</script>
 ```
- 次に親コンポーネント側で子コンポーネントにデータを渡すために`v-bind`ディレクティブを使用する
- `:props名="データ"` という形式で子コンポーネントにデータを渡す

```vue
<!-- Parent.vue -->
<template>
  <Child :message="message" />
  <!-- props名とデータの変数名が同じ場合は省略記法が使ええる-->
  <Child :message />
</template>
```

- `emit`:**子コンポーネント**から**親コンポーネント**にイベントを発火する方法
    - まずは子コンポーネント側で`defineEmits`マクロを使用し，**発火したいイベント**を定義する。emit関数を用いてイベントを発火できる
```vue
<!-- Child.vue -->
<script setup lang="ts">
  const emit = defineEmits<{ sendMessage: [] }>()
</script>

<template>
  <button type="button" @click="emit('sendMessage')">
    Click me
  </button>
</template>

<!-- イベント発火時に子コンポーネントからデータを受け渡すChild.vue -->
<script setup lang="ts">
  const emit = defineEmits<{ sendMessage: [string] }>()
</script>

<template>
  <button type="button" @click="emit('sendMessage', 'Hello, Vue!')">
    Click me
  </button>
</template>
```
- 発火されたイベントは親コンポーネントで`v-on`ディレクティブを使用して受け取ることができる
```vue
<!-- Parent.vue -->
<script setup lang="ts">
  function handleSendMessage() {
    console.log('Message sent!')
  }
</script>

<template>
  <Child @send-message="handleSendMessage" />
</template>

<!-- イベント発火時に子コンポーネントからデータを受け渡すParent.vue -->
<script setup lang="ts">
  function handleSendMessage(message: string) {
    console.log(message)
  }
</script>

<template>
  <Child @send-message="handleSendMessage" />
</template>
```
#### example
親コンポーネントでslotにテンプレートを挿入する
```vue app.vue
<script setup lang="ts">
import Child from './Child.vue'

const name = ref('John Doe')

function updateName(value: string) {
  name.value = value
}
</script>

<template>
  <div>
    <h1>Parent Component</h1>
    <p>Hi, {{ name }} 👋</p>
    <Child
      :name
      @update:name="updateName"
    >
      <template #paragraph>
        <!-- slot name="paragraph"  -->
        Hello from <span class="red--text">Parent!</span>
      </template>
    </Child>
  </div>
</template>

<style scoped>
.red--text {
  color: red;
}
</style>
```

子コンポーネントでslotを定義
```vue Child.vue
<script setup lang="ts">
defineProps<{
  message: string
  name: string
}>()

const emit = defineEmits<{
  'update:name': [name: string]
}>()

defineSlots<{
  paragraph: () => any
}>()
</script>

<template>
  <div class="child-component">
    <h2>Child Component</h2>
    <p><slot name="paragraph" /></p>
    <input
      type="text"
      :value="name"
      @input="emit('update:name', $event.target.value)"
    >
  </div>
</template>

<style scoped>
.child-component {
  border: solid red;
  padding: 1rem;
}
</style>

```