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

## 削除を実装


## Cloud FireStoreのルール
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone with your Firestore database reference to view, edit,
    // and delete all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Firestore database will be denied until you Update
    // your rules
    match /{document=**} { 
    match /users/{userId}/memo/{memo}{ //コレクションの構造を表すように変更
      allow read, write: if request.time < timestamp.date(2025, 6, 15);
      alow read, write: if request.auth.uid == userId; // ユーザーIDが一致する場合のみ読み書き可能
    }
  }
}
```
現在テストモード（誰でもアクセスできる~2025.6.15）なので別ユーザーが操作できないようにした


## リリース，一般公開
この状態ではアプリの審査に通らない
- プラットフォームのレギュレーションが変わってきている
 - ログインをせずにアプリを使えるようにしなければならない(iOS)
   - 匿名でログインさせる
 - ログアウト，会員削除できるようにする

## ビルド，提出
- スプラッシュ画像
  - アプリの起動時に表示される画像
- Appアイコン
  - ホーム画面表示されるアイコン
- feature画像
  - Playストアで必要な画像
- アダプティブアイコン
  - 2個
- スクリーンショット
  - アプリの画面をキャプチャした画像

- アプリのアイコンはapp.jsonのexpo/iconで指定
- スプラッシュ画像はapp.jsonのexpo/splashで指定
  - coverに変えるとデバイスによる余白がなくなる
- adaptiveアイコンはapp.jsonのexpo/android/adaptiveIconで指定

ビルドの設定
ios
- support Tablet : タブレットでつかるようにする
- bundle identifier : com.example.memoapp ,通常は自分のウェブサイトの逆順
- bundle Number : アプリのバージョン番号

android
- package: bundle identifierと同値
- versionCode: アプリのバージョン番号=bundle Number
- permissions: 配列

EASを使ったビルド
- EASをインストール
  - `npm install -g eas-cli`
  - eas.jsonを作成
```json
{
  "build": {
    "production": {
    "env": {
    "EXPO_PUBLIC_FB_API_KEY": "xxxxxxxx",
    "EXPO_PUBLIC_FB_AUTH_DOMAIN": "xxxxxxxx",
    "EXPO_PUBLIC_FB_PROJECT_ID": "xxxxxxxx",
    "EXPO_PUBLIC_FB_STORAGE_BUCKET": "xxxxxxxx",
    "EXPO_PUBLIC_FB_MESSAGING_SENDER_ID": "xxxxxxxx",
    "EXPO_PUBLIC_FB_APP_ID": "xxxxxxxx",
    "EXPO_PUBLIC_FB_MEASUREMENT_ID": "xxxxxxxx"
    }
    },
    "preview": {
      "extends": "production",
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```
を設定したら
```shell
eas login
eas build-p ios 
## アップルのデベロッパーアカウントを持っていないと公開できない US$99/year
Select Team
Select Provider
Push Notification
## プッシュ通知があるかどうか
Build Deatils : https://expo.dev/accounts/niwa28116/projects/memoapp/builds/0~~~
```

にアクセスするとexpoで詳細が見れる
ストアに公開する用のipaファイルがダウンロードできる

シュミレーター用のビルド
```shell
eas build -p ios --profile=preview
```
終わったらappファイルがダウンロードしてシミュレーターにドラッグ&ドロップすればシミュレーター上で角煮できる
androidも同様にiosの部分をandroidに変えればできる

あとは審査
