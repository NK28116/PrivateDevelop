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
      const finishid:number = count-1;
//console.log(count);
  let idArray: string[] = [];
  let countArray:number[]=[];

  for (let i = 0; i < count; i++) {
      //数えはじめのidを取得，配列の名前になる
    const element = elements.nth(i);
    const id:string = await element.getAttribute('id'); // id="day_2025-03-31"


    if (id) {
        //idをicsにしやすいようにYYYYMMMDD形式に変換
        const iCalFormatId=id.replace(/^day_(\d{4})-(\d{2})-(\d{2})$/, '$1$2$3');
        idArray.push(iCalFormatId);
    }

    if(i<finishid){
    //数え終わりのidを取得，ここまでの要素数が配列の要素数となる
    const nextElemnt=elements.nth(i+1);
    const nextId:string = await nextElemnt.getAttribute('id');
    //id間の要素数を取得
    const eventNumberPerDay:number = await countElementsBetween(page,id,nextId)
    countArray.push(eventNumberPerDay);
    }

  }
//一番下に今日のイベントがあるのでそれを排除
  idArray.splice(-1,1);//配列名
countArray.splice(-1,1);//要素数


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


let index = 0;
const result: [string, string[]][] = idArray.map((dayArray, i) => {
  const subArray = detailArray.slice(index, index + countArray[i]);
  index += countArray[i];
  return [dayArray, subArray];
});

console.log(result);

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

  await browser.close();
})();


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
