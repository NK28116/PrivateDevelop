import {splitArrayByCondition} from './eventArraySlice';
import {Locator, Page} from "@playwright/test";

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
console.log(count);
  let idArray: string[] = [];
  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    const id:string = await element.getAttribute('id'); // id="day_2025-03-31"


    //idをicsにしやすいようにYYYYMMMDD形式に変換
    if (id) {
        const iCalFormatId=id.replace(/^day_(\d{4})-(\d{2})-(\d{2})$/, '$1$2$3');
      idArray.push(iCalFormatId);
    }


  }
  idArray.splice(-1,1);//一番下に今日のイベントがあるのでそれを排除
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


/**
 * 指定したID間の要素数を取得
 * @param page PlaywrightのPageオブジェクト
 * @param startId 開始要素のID (例: "day_2025-03-30")
 * @param endId 終了要素のID (例: "day_2025-03-31")
 * @returns 要素数
 */
async function countElementsBetween(page: Page, startId: string, endId: string): Promise<number> {
    const betweenElements: Locator = page.locator(
        `//*[@id="${startId}"]/following-sibling::*[following-sibling::*[@id="${endId}"]]`
    );
    return await betweenElements.count();
}