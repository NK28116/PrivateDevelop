元ネタ https://obsproject.com/forum/resources/display-fightstick-motions.344/
似たようなの見つけたって？（https://obsproject.com/forum/resources/display-fightstick-motions.344/）
ま，勉強のためにやろうぜ

# fightStickMotionの改造
1. SF6モダンに対応
2. GGSTに対応
3. EWGFなどの練習モードを追加

## 0. fightStickMotionの概要
1. ブラウザでRAPSESetting.htmlを開く
2. 各種パラメータを持ったfightstick.htmlが開かれる
   1. Input History Mode での動作
      1. id='inputhistorygame'
      2. value=Default
      3. ボタン入力でonchnage: updateInputHistoryToggle()
      4. value=Tekken
      5. inputhistorytekkenfieldsetが表示され，mappingが行われる
         1. `select id="inputhistorytekkenbtn" onchange="updateInputHistoryTekkenBtn();"`で割り当てられる動作を選択
         2. `<select id="inputhistorytekkenbtnmapto" onchange="updateInputHistoryTekkenBtnMapTo();">`で割り当てるボタンを選択
         3. 割り当てるボタンはボタンの入力を1.2.3.4に対応している

### ボタン画像の変更
1. モダン
   1. 弱
   2. 中
   3. 強
   4. 必    
   5. AUTO
   6. DI
   7. DP
   8. 投
2. GGST
   1. P
   2. K
   3. S
   4. HS
   5. FD
   6. DASH
   7. DUST
   8. RC
   9. BURST


## 1. SF6モダンに対応
- inputHistoryを弱,中,強,必,AUTO,DI,DP,投,に対応

## 2. GGSTに対応
- inputHistoryをP, K, S, HS, FD, DASH, DUST, RC, BURSTに対応

## 3. EWGFなどの練習モードを追加
- inputHistoryで6-2-3RPで最速になっていないと3のみが表示されるのでその場合は「失敗」と表示されるようにする
