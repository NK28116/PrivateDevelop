# React 19 の新機能

## [WIP]useFormStatus: SubmitForm.tsx
- 直近のフォーム送信に関するステータス
```jsx
const { pending, data, method, action } = useFormStatus();
//引数:必要なし，返数:status Object
//pending:boolean,送信中であるならばtrue
//data:<form>が送信中のデータの中身.FromDataインターフェースを実装している
//method:get or post.<form>がどっちのHTTPメソッドを使っているか
//action:<form>のpropsであるactionに渡された関数への参照.
```
### 使用例
```tsx
import React from 'react';
import { useFormStatus } from 'react-dom';

// FormData を使って送信データを表示するコンポーネント
function MyFormComponent() {
  const { pending, data, method, action } = useFormStatus();

  // `data` が FormData 型であることを確認
  const formData = data instanceof FormData ? data : null;

  return (
    <div>
      <form action={action} method={method}>
        <input type="text" name="query" placeholder="Enter some text" />
        <button type="submit" disabled={pending}>
          {pending ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* フォーム送信状態 */}
      <div>
        {pending && <p>Form is being submitted...</p>}
        {!pending && formData && (
          <div>
            <h3>Form Data:</h3>
            <pre>
              {Array.from(formData.entries())
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')}
            </pre>
          </div>
        )}
      </div>

      {/* 送信方法とアクションの情報 */}
      <div>
        <p>Method: {method}</p>
        <p>Action: {action}</p>
      </div>
    </div>
  );
}

export default MyFormComponent;

```

## useActionState: Counter.tsx
- onClickを使わずにstateを変更できる
  - React 18はRate.tsx
  - Counter.tsxでReact19
    - IncrementボタンとDecrementボタンを作ってその合計を表示している
```tsx
import { useActionState } from 'react';

function MyComponent(): {state: Type, formAction: () => void} {
  const [state, formAction] = useActionState(action, init);
  //state:stateの現在値(初期値，formが送信された後はactionの返り値)
  //fromAction:<form>のpropsであるactionに渡す新しいactio
  //action:渡すaction関数
  //init:stateの初期値
  return (
    <form action={formAction}>
      {/* ... */}
    </form>
  );
}
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
