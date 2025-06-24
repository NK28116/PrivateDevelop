元ネタ https://obsproject.com/forum/resources/display-fightstick-motions.344/
似たようなの見つけたって？（https://obsproject.com/forum/resources/display-fightstick-motions.344/）
ま，勉強のためにやろうぜ

fightStickMotion/がorigin

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

# 使用する言語，フレームワーク
- モダンなフレームワークであるNuxt.jsをtypescriptベースで書く
- リリースとかサイズ感とかをを考えると他でも構わないが，自分の勉強のためにnuxtにする
- webコンパイラとドキュメントは`https://learn-nuxt.vuejs-jp.org/vue` にある
- 勉強のためのファイルは `PrivateDevelop/NuxtLecture`を用いる

# Structure

```
fightstick.html
|_head
   |_ meta
   |_ meta
   |_ meta
   |_ title
   |_ link
   |_ link
|_body
   |_ span class=tooltip
      |_ div id=assignbuttontooltip class=tooltiptext tooltiptextassignbutton
      |_ div id=container class=container
         |_ div id=gamepad0 class=gamepad-background
            |_ div id="gamepad-background-image" class="gamepad-disconnected"
            |_ div id="gamepad-area" class="gamepad-area"
               |_ <div id="gamepad-area-background" class="gamepad-area-background"
               |_ <div id="stick-area" class="stick-area">
                  |_ <div id="stick" class="stick">
                  |_ <div id="stick-up" class="stick-block stick-up">
                  |_ <div id="stick-down" class="stick-block stick-down">
                  |_ <div id="stick-left" class="stick-block stick-left">
                  |_ <div id="stick-right" class="stick-block stick-right">
               |_ <div id="button-area" class="button-area">
   |_ div id="inputlist" class="inputlist hide"
   |_ div id="inputarea" class="hide"
      |_ fieldset id="titlefield"
         |_ div
            |_ span class="tooltip"
               |_ div class="tooltiptext tooltiptexttitle"
               |_ a class="titletext"
      |_ fieldset id="inputareafield" class="invisiblefieldset"
         |_ ul class="tabs"
            |_ div id="tab-topline" class="tab-topline"
               |_ input id="tab1"
               |_ label
               |_ div id="tab-content1" class="tab-content"
                  |_ div id="savelink"
                     |_ label
                        |_ span class="tooltip"
                           |_ div id="savelinktooltip" class="tooltiptext tooltiptextlink"
                           |_ input id="savelinktext" 
                     |_ button
                  |_ div id="customlink"
                     |_ label
                        |_ span  class="tooltip"
                           |_ div id="customlinktooltip" class="tooltiptext tooltiptextlink" 
                           |_input id="customlinktext"
                     |_ button class="copybtn"
                     |_ button
                  |_ div id="obsbrowserlink" class="hide
                     |_ label 
                        |_ span lass="tooltip"
                           |_ div   id="obslinktooltip" class="tooltiptext tooltiptextlink"
                           |_input id="obsbrowserlinktext" 
                     |_button class="copybtn"
                  |_ div id="scale"
                     |_ label
                        |_ input class="inputnumber" id="scalevalue"
                  |_ div id="bgopacity"
                     |_ label
                        |_ input  id="bgopacityvalue"  class="inputnumber" 
            |_ li
               |_ input id="tab1"
               |_ label
               |_ div  id="tab-content1" class="tab-content"
                  |_ div id="savelink"
                     |_ label
                        |_ span class="tooltip"
                           |_ div id="savelinktooltip" class="tooltiptext tooltiptextlink"
                           |_ input id="savelinktext"
                     |_ button
                  |_ div
                  |_ div
                  |_ div
                  |_ div
                  
            |_ li
               |_ input id="tab2"
               |_ label
               |_ div id="tab-content2" class="tab-content"
                  |_ div id="userspecific"
                     |_ input id="userspecifictoggle" class="checkboxbutton"
                     |_ span
                     |_ span class="tooltip"
                        |_ div class="tooltiptext tooltiptextlink"
                        |_ a
                     |_ div id="userspecificdropdown" class="dropdown"
                        |_ form id="userspecificform" 
                           |_ fieldset id="userspecificfield"
                              |_ legend
                              |_ div class="tooltip"
                                 |_ div class="tooltiptext tooltiptextuserspecific"
                                 |_ span  class="userspecificname"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input   id="userspecifican" class="inputnumbervalue"
                                 |_ span  class="userspecificname"
                                    |_ input   id="userspecifican" class="inputnumbervalue"
                                    |_ input    id="userspecifican" class="inputnumbervalue"                   
                                    |_ input     id="userspecifican" class="inputnumbervalue"           
                                 |_ span  class="userspecificname"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input   id="userspecifican" class="inputnumbervalue"
                                 |_ span  class="userspecificname"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input   id="userspecifican" class="inputnumbervalue"
                                 |_ span  class="userspecificname"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                 |_ span  class="userspecificname"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                 |_ span  class="userspecificname"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                 |_ span   class="userspecificname"
                                    |_ input id="userspecifican" class="inputnumbervalue"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
                                 |_ span  class="userspecificname"
                                    |_ input id="userspecifican" class="inputnumbervalue"
                                    |_ input  id="userspecifican" class="inputnumbervalue"
            |_ li
   |_ script

```