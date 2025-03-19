import {splitArrayByCondition} from './eventArraySlice';

const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://kakuge-checker.com/event/list/');

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
   console.log(detailArray[2]);
/**
* 時間
* 未確認
* 漫画『対ありでした。』更新日
* 漫画更新日
*
* 20:30
  * 火星杯 ※変則ルールあり
  * オンライン キャン太2大会
*/

    const split=detailArray.map(detailArray=>detailArray.split("\n")[0]);
    console.log(split);
/**
* [
  *   '時間',  '18:00', '20:00', '20:30', '21:30', '22:00',
  *   '11:00', '12:30', '13:00', '21:00',
  *   '時間',  '02:55',
  *   '時間',  '21:00', '21:30', '22:00', '23:00',
  *   '02:00', '11:00', '11:00', '13:00', '20:00', '21:00', '21:00',
  *   '21:00', '21:00', '21:00', '22:00',
  *   '02:00', '11:00', '13:00', '13:30', '14:00', '17:00', '18:00', '19:00',
  *   '19:00', '20:00', '20:00', '20:00',
  *   '02:00',
  *   '時間', '12:00', '21:00', '21:00',
  *   '00:00',
  *   '時間',  '14:00', '22:00', '22:30',
  *   '10:00', '12:00', '13:00', '18:00', '20:30', '22:00',
  *   '時間',  '12:00', '13:30', '14:00', '14:00', '16:00', '21:00', '21:00',
  *
  *   '13:00',
  *   '時間','18:00', '20:00', '20:30', '21:30', '22:00'
  * ]
*/

const sliceArray:string[][]= splitArrayByCondition(split)
console.log(sliceArray)
/**
* [
  *   [ '時間', '18:00', '20:00', '20:30', '21:30', '22:00' ],
  *   [ '11:00', '12:30', '13:00', '21:00' ],
  *   [ '時間', '02:55' ],
  *   [ '時間', '21:00', '21:30', '22:00', '23:00' ],
  *   [
  *     '02:00', '11:00',
  *     '11:00', '13:00',
  *     '20:00', '21:00',
  *     '21:00', '21:00',
  *     '21:00', '21:00',
  *     '22:00'
  *   ],
  *   [
  *     '02:00', '11:00',
  *     '13:00', '13:30',
  *     '14:00', '17:00',
  *     '18:00', '19:00',
  *     '19:00', '20:00',
  *     '20:00', '20:00'
  *   ],
  *   [ '02:00' ],
  *   [ '時間', '12:00', '21:00', '21:00' ],
  *   [ '00:00' ],
  *   [ '時間', '14:00', '22:00', '22:30' ],
  *   [ '10:00', '12:00', '13:00', '18:00', '20:30', '22:00' ],
  *   [
  *     '時間',  '12:00',
  *     '13:30', '14:00',
  *     '14:00', '16:00',
  *     '21:00', '21:00'
  *   ],
  *   [],<-本当はここに空白が来るはず
  *   [ '13:00' ],
  *   [ '時間', '18:00', '20:00', '20:30', '21:30', '22:00' ]
  * ]
*/
//決定↓
const elements = await page.locator('div[id^="day_"]'); // idが"day_"で始まるdivを取得
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
//決定↑
console.log(idArray); // 取得したid値を出力
/**
*  '20250319', '20250320',
*   '20250321', '20250322',
*   '20250323', '20250324',
*   '20250325', '20250326',
*   '20250327', '20250328',
*   '20250329', '20250330',
*   '20250331', '20250401'
*/

  await browser.close();
})();


//振り分けのメソど
const arrayDay=["day1","day2","day3"]
const arrayEvent=[["event1 ",'event2','event3'],['event4','event5','event6'],['event7']]
const combination=arrayDay.map((item,index)=>{return[item,arrayEvent[index]]})
