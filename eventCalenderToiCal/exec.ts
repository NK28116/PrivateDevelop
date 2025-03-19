import {splitArrayByCondition} from './eventArraySlice';

const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://kakuge-checker.com/event/list/');

  /**
  *  idが"day_"で始まるdivを取得してYYYYMMDD形式に変える
  *  これが配列名になる
*/
  const elements = await page.locator('div[id^="day_"]');
  const count:number = await elements.count();

  let idArray: string[] = [];
  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    const id:string = await element.getAttribute('id'); // id値を取得
    if (id) {
        const iCalFormatId=id.replace(/^day_(\d{4})-(\d{2})-(\d{2})$/, '$1$2$3');
      idArray.push(iCalFormatId);
    }
  }
  idArray.splice(-1,1);
  //console.log(idArray); // 取得したid値を出力
  /**output
  *  '20250319', '20250320',
  *   '20250321', '20250322',
  *   '20250323', '20250324',
  *   '20250325', '20250326',
  *   '20250327', '20250328',
  *   '20250329', '20250330',
  *   '20250331', '20250401'
  */

  /**
  * 各id間の要素の数を取得する
  * ここでは例としてday_2025-03-30とday_2025-03-31
  * for文で繰り返し
 */
  const startElement = await page.locator('//*[@id="day_2025-03-30"]');
  const endElement = await page.locator('//*[@id="day_2025-03-31"]');

  // startElement と endElement の間の要素を XPath で取得
  const betweenElements = await page.locator(
    '//*[@id="day_2025-03-30"]/following-sibling::*[following-sibling::*[@id="day_2025-03-31"]]'
  );

  const countTag = await betweenElements.count();

 // console.log(`startElement と endElement の間にある要素数: ${countTag}`);
//startElement と endElement の間にある要素数: 8

/**
* 上記で取得した数の配列を作る
* 例）20250330-20250331にある要素数は8なので,20250330[8]
*    20250331-20250401にある要素数は0なので,20250331[0]
* それぞれにイベントを格納する.
*
*/

//function


/**
* 上記で作った日付配列に挿入するためtableに表示されているイベントをString[]で取得
*/
  await page.waitForSelector('.event_flex_row_day_rows');
  //イベントタイトルを配列で取得
   const event = await page.locator('.event_flex_row_day_rows');
   let dataSet:number = await event.count();
   let  detailArray: string[]=[];
   for (let i=0;i<dataSet;i++){
    const eventNameSet = await event.nth(i)
    const detail: string = await eventNameSet.innerText();
    detailArray.push(detail)
   };
   //console.log(detailArray);
/**out
* [
*   '時間\n未確認\n漫画『対ありでした。』更新日\n漫画更新日',
*   '18:00\nFighters Crossover Akihabara ※餓狼CotW試遊あり\n東京都 発売前体験イベント',
*   '20:00\n赤見かるびプレゼンツ CRメンバー×スト6\nスト6イベント',
*   '20:30\n火星杯 ※変則ルールあり\nオンライン キャン太2大会',
*   '21:00\n俺嫁杯 ～俺の伴侶がこんなに弱いわけがない～ ※推しキャラ大会\nオンライン GBVSR大会',
*   '21:30\n夜集会 ※実力制限あり、紅白戦\nオンライン KOF15大会',
*   '22:00\n2先シングルエリミネーション大会\nオンライン GBVSR大会',
*   '11:00\nLAKUNA HAKUI CUP 会場予選＆決勝大会\n石川県 スト6大会',
*   '12:30\nAlldevice Cup\nオンライン スト6大会',
*   '13:00\nKAMOSU ESPORTS FESTIVAL\n島根県 スト6イベント',
*   '21:00\n登竜門 ※S+以下限定\nオンライン グラブルVSR大会',
*   '21:00\nめがほCC ※初中級者限定\nオンライン P4U2大会',
*   '21:00\nシン・人参杯\nオンライン BBCF大会',
*   '21:30\n蛇鎖杯\nオンライン BBTAG大会',
*   '時間\n' +
*     '未確認\n' +
*     '（対戦ACT）『BLEACH Rebirth of Souls』発売日 機種：PS5 / PS4 / XboxSX|S / Steam\n' +
*     '発売日',
*   '02:55\nフジテレビ いいすぽ！＋ ※スト6（カプコンカップ）回\n地上波テレビ放送',
*   '時間\n未確認\n『アイアンサーガVS』（Steam）発売日\n発売日',
*   '21:00\n虚ろの金曜夜Again\nオンライン UNI2大会',
*   '21:00\nGrab It The 31 絆 ※2on2大会、ハンデあり\nオンライン スト6大会',
*   '21:00\n金曜だから夜更かし\nオンライン GBVSR大会',
*   '21:30\nKOPANGA LEAGUE ASSEMBLE 3日目\n鉄拳8イベント',
*   '22:00\nかいん杯\nオンライン アルブラ大会',
*   '23:00\nきらら杯 ※SOLOモード大会\nオンライン キャン太2公式大会',
*   '02:00\nアメリカ アークワールドツアー2024ファイナル 1日目\n海外 格闘ゲーム大会',
*   '11:00\n第11回 世紀末武闘会\n東京都 AC北斗の拳大会',
*   '11:00\nBeast Cup KUMITE 3on3 ※3on3大会、マスター未満／無差別帯の2部門\nオンライン スト6大会',
*   '13:00\nVSPO! SHOWDOWN 1日目 17:40～スト6\n東京都 スト6イベント',
*   '20:00\nLocust杯\nオンライン KOF15大会',
*   '21:00\nチャ王杯\nオンライン GGST大会',
*   '21:00\nYeSUカップ\nオンライン GBVSR大会',
*   '21:00\n70％OFFセール記念大会 ※ハンデあり\nDNFイベント',
*   '21:00\nちゅっちゅラジオ杯 ※MR1699以下限定\nオンライン スト6大会',
*   '21:00\nValkyrieカップ ※女性限定\nオンライン GGST大会',
*   '22:00\nNewgeneration Breakers Tournament ※初～中級者大会\nオンライン KI大会',
*   '23:00\nクマザワールドカップ\nオンライン アルカナ3LSX大会',
*   '02:00\nアメリカ アークワールドツアー2024ファイナル 2日目\n海外 格闘ゲーム大会',
*   '11:00\n（格ゲー以外）5先ポーカー大会\n選手＆ストリーマー関連',
*   '13:00\n超！初心者大会 ※初心者限定\nオンライン KOF15大会',
*   '13:30\nVSPO! SHOWDOWN 2日目 ※スト6は1日目\n東京都 スト6イベント',
*   '14:00\niXA CUP ※22歳以下限定\nオンライン スト6大会',
*   '17:00\nCAPCOM eSPORTS CLUB 月例トーナメント\nオンライン スト6大会',
*   '18:00\nトルジ杯\nオンライン スト6大会',
*   '19:00\nアバターバトルチャンピオン ※アバターバトル大会\nオンライン スト6大会',
*   '19:00\n黄昏杯 ※S+1未到達限定\nオンライン UNI2大会',
*   '20:00\n細かすぎて伝わらない格ゲーモノマネ選手権\n東京都 格闘ゲーム関連',
*   '20:00\n俺の嫁が一番可愛い杯\nオンライン GGST大会',
*   '20:00\nweekend-KOF\nオンライン KOF15大会',
*   '21:00\nゴレイヌ杯 ※ひとり3on大会\nオンライン アルカナ3LSX大会',
*   '02:00\nアメリカ アークワールドツアー2024ファイナル 3日目\n海外 格闘ゲーム大会',
*   '時間\n未確認\nV最スト6 スクリム開始日\nスト6イベント',
*   '12:00\nTEKKEN Talk Live シーズン2＆アンナスペシャル\n鉄拳8イベント',
*   '21:00\nOVER THE LIMIT ※参加制限あり大会\nオンライン Vセイヴァー大会',
*   '21:00\nブロジョ杯 ※日・韓・台・港範囲でのオンライン大会\nオンライン GGST大会',
*   '00:00\n漫画雑誌『月刊ビッグガンガン』発売日 ※ハイスコアガール DASH連載誌\n発売日',
*   '21:05\n毛～腕トーナメント\nオンライン スト6大会',
*   '時間\n未確認\nマイナビeカレ2025 決勝大会 ※大学生限定、3on3大会 ※詳細未確認\nオンライン スト6大会',
*   '14:00\n『餓狼CotW』第2回オープンβテスト期間 ※3/31（月）17:00まで\n発売前体験イベント',
*   '22:00\nKiller Instant Tournament\nオンライン KI大会',
*   '22:30\nTHE KING OF FANTASY 属性限定大会 ※特殊編成限定大会\nオンライン KOF15大会',
*   '10:00\nASIA esports EXPO ※3/29・30開催 ※詳細未確認\n愛知県 eスポーツイベント',
*   '12:00\nデュナミス作戦2025 1日目 ※新人戦1on1／1on1\n大阪府 エヌアインA公式大会',
*   '13:00\nVTuber最協決定戦 スト6 1日目\nオンライン スト6イベント',
*   '14:00\nトップをとれ！ ※2on2大会\nオンライン スト6大会',
*   '18:00\nすぱいく杯 ※3on3大会\nオンライン スト6大会',
*   '20:30\nミドリバCF ※実力制限あり\nオンライン P4U2大会',
*   '22:00\nルーキー大会 ※初心者向け大会\nオンライン KI大会',
*   '時間\n未確認\n（予定日）日韓米対抗戦\nオンライン BBTAG大会',
*   '12:00\nデュナミス作戦2025 2日目 ※ランダム2on2／紅白戦\n大阪府 エヌアインA公式大会',
*   '13:30\nBLACKCAT CUP\nオンライン スト6大会',
*   '14:00\nVTuber最協決定戦 スト6 2日目\nオンライン スト6イベント',
*   '14:00\nゆなっこ杯 3on3 ※3on3大会\nオンライン スト6大会',
*   '16:00\nトルジ杯 ※2on2大会\nオンライン スト6大会',
*   '21:00\n月末大会\nオンライン 恋姫遼来来大会',
*   '21:00\nYeSU CUP\nオンライン スカルガ大会',
*   '13:00\n『鉄拳8』シーズン2開幕アップデート日 「アンナ」早期アクセス参戦、大型バランス調整含む ※時間は未確認\nアップデート日',
*   '時間\n未確認\n漫画『対ありでした。』更新日\n漫画更新日',
*   '18:00\nFighters Crossover Akihabara ※餓狼CotW試遊あり\n東京都 発売前体験イベント',
*   '20:00\n赤見かるびプレゼンツ CRメンバー×スト6\nスト6イベント',
*   '20:30\n火星杯 ※変則ルールあり\nオンライン キャン太2大会',
*   '21:00\n俺嫁杯 ～俺の伴侶がこんなに弱いわけがない～ ※推しキャラ大会\nオンライン GBVSR大会',
*   '21:30\n夜集会 ※実力制限あり、紅白戦\nオンライン KOF15大会',
*   '22:00\n2先シングルエリミネーション大会\nオンライン GBVSR大会'
* ]
*/

/**
* 先頭から挿入していくが要素数が0のところは除く
* [
  * 20250319[  '時間',  '18:00', '20:00', '20:30', '21:30', '22:00', '11:00', '12:30', '13:00', '21:00',]
  *  20250320 ['時間',  '02:55',]
  *   20250321['時間',  '21:00', '21:30', '22:00', '23:00',]
  *   ....
  * ]
*/

/**
* ics形式にするため
* type OwnCalendar = {
            *   Date: number;
            *   Hour: number;
            *   Minutes: number;
            *   Event: string;
            * };
* に合わせる
*/
/**
* 以下はたぶん使わないやつ
*/
    const split=detailArray.map(detailArray=>detailArray.split("\n")[0]);
//    console.log(split);
const sliceArray:string[][]= splitArrayByCondition(split)
//console.log(sliceArray)
/**
* ぬらうざを閉じる
*/

  await browser.close();
})();


//振り分けのメソど
const arrayDay=["day1","day2","day3"]
const arrayEvent=[["event1 ",'event2','event3'],['event4','event5','event6'],['event7']]
const combination=arrayDay.map((item,index)=>{return[item,arrayEvent[index]]})
