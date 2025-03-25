```txt
src
|--App.tsx
|__WinRate:勝率計算を表示する
    |__WinRate.tsx:Appに渡す
    |__CaluculateRateAndWLBotton.tsx:勝率，勝利数，敗北数，全試合数を表示してボタンで増減
|__SubmitForm.tsx:新規に名前を登録するボタン
```

- スプレッドシートでいいことをreact19の勉強のために作成する
- データアセットとかあればいいよね

WinRateとSubmitFormのstateを組み合わせて`state={Name,WinRate[WiRate,Win,Loose,Total]}` にして List表示する

