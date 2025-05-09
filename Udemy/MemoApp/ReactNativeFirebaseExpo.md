Udemy Lecture

## セクション9
### 46: Expoのファイル構成
- assets : 画像やフォントを保存する
- node_module : ライブラリ
    - package.jsonを編集してnpm install
      - scripts:エイリアス
        - npm start = npx expo start
    - package-lock.json : 依存関係の詳細
- gitigonre : gitで追跡しないファイル
- app.json : MemoAppの設定
- App.tsx : アプリ本体
- babel.config.js
- tsconfig.json : typescriptの設定ファイル

## セクション10 : コンポーネント

- iOS simulator上でcmd+d->reloadで再読み込み
- android simulator上でcmd+m

Hello.tsx  -> componentの定義
Hello Componentに外側から文字列を与えて表示するprops

Helloという変数に代入される引数propsは型Props
Propsはchildren:stringを持つ
`<Hello bang={false}>World</Hello>`
children(World)はHello Componentの子要素は大抵一つ

通常propsはbangのように筆記する
`bang={true}`と`bang` は同義

App.tsxからHelloのスタイルを指定する
Propsにtype TextStyleを追加
style={{スタイル}}