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

## セクション11
expo-router
ファイルベースのルーティングが可能
src/appの中にあるファイルが全て画面として認識される
`npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler`
package.jsonで`"main":"expo-router"`にする
expoを再起動
App.tsxはもう使わないので削除
`src/app/_layout.tsx`を追加 -> app内の全ての画面のスタイルを決定する

flexの位置は
```
              justifyContent:'flex-start'
                             |
alingnItems:'flex-start'-----*-----alignItems:'flex-end'
                             |
                justifyContent:'flex-end'

```

になっている

スタイリング
`const styles=StyleSheet.create({})`内に定義

一般的なvetor iconはreact-native-vector-icons directoryにある

========デバイスの画面===
↑
|
|
テキストボックスをflex:1で無理やり引き伸ばし
|
|
↓
=========デバイスの画面===

キーボードでボタンが隠れる問題は
'<keyboard avoiding view > </keyboard avoiding view >'

### インタラクティブとナビゲーション
#### ボタンやリンクを有効にする
touchable opecity
->より詳細なイベントはpressable
コンポーネントを切り出したの1つ変えただけでも変化が全てのページ出る
文章をリンク可能にするならtouchableOpacityで囲う

LinkのasChildプロパティは透明度を落とす感じ

submit->login処理->momelist

back buttonはstackでデフォルトなバックボタンを作成できる

router.push('')は今の画面のstackナビゲーションに移動履歴を1つ追加する
roter.replace('')は今の画面を置き換える

cannnot update component -> reactのcomponentの処理のタイミングで問題が起きている
```
    const navigation=useNavigation()
    navigation.setOptions({
        headerRight:()=>{
            return <Text>Test</Text>
        }
    })
```
が追加されただけだと常にこの処理が走ってしまって問題が起きるのでmemo画面が表示されたら1回だけ表示できるようにしたい
-> useEffectを使う
` useEffect(()=>{},[count])`は依存関係を表す
countが実行されるたびに()=>{}が実行される

```
    useEffect(()=>{
        const navigation=useNavigation()
        navigation.setOptions({
            headerRight:()=>{
                return <Text>Test</Text>
            }
        })
    },[])
```
としたいがreactHook{expo-router Hook}で問題が出ているのでconst navigationは外に出す

userのinputを受け付けるためにuseStateを使う

## login機能をfirebaseを使って実装
web App登録
- npx expo install firebase @react-native-async-storage/async-storage
firebase 構築 　authentication
- config.tsの作成
使用するメアドとパス
- niwa28116@text.com
- testpassword
log inの監視

テストID
1sy5r94yH@test.com
p9sEjcMp9E

firebase 構築 firebase database
 request.time < timestamp.date(2025, 6, 15);を延長すれば読み書きができる期間を伸ばせる
 firestoreデータモデル
 collection>document> data
 reference=documentとcollectionの参照

async-awaitのメリット：コールバックの入れ子を避ける

query(ref)でrefで参照しているものを全て取得

全部データを取得させないで画面に写っている部分だけ表示させたい→FLatList

データベースからデータをもらってきて詳細画に表示
detail からデータベースにアクセスしたいがそのためにはドキュメントのIDが必要
どのメモの情報を表示すればいいかわからないのでリスト画面から情報を渡す

## 編集画面を実装
detailだとhandlePressを押すとmemo/editに遷移するのでここにオブジェクトを入れる
firestore-list->detail画面-編集ボタンを押す->edit-完了ボタンをプッシュ->firestoreを更新
Editだとデータを監視する必要はない
