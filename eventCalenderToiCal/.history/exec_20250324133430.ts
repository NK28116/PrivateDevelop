import {splitArrayByCondition} from './eventArraySlice';
import {Locator, Page} from "@playwright/test";
import {makeiCalBlock, OwnCalendar} from "./makeiCalFile";

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
/**
 * 指定したID間の要素数を取得
 * @param page PlaywrightのPageオブジェクト
 * @param startId 開始要素のID (例: "day_2025-03-30")
 * @param endId 終了要素のID (例: "day_2025-03-31")
 * @returns 要素数
 */
const countElementsBetween=async(page: Page, startId: string, endId: string): Promise<number> =>{
    const betweenElements: Locator = page.locator(
        `//*[@id="${startId}"]/following-sibling::*[following-sibling::*[@id="${endId}"]]`
    );
    return  await betweenElements.count();
}

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

/**
*
* result:length 14
* result[3]:length 2
*
* [
  *   '20250324',
  *   [
  *     '02:00\nアメリカ アークワールドツアー2024ファイナル 3日目\n海外 格闘ゲーム大会',
  *     '時間\n未確認\nV最スト6 スクリム開始日\nスト6イベント',
  *     '12:00\nTEKKEN Talk Live シーズン2＆アンナスペシャル\n鉄拳8イベント',
  *     '21:00\nOVER THE LIMIT ※参加制限あり大会\nオンライン Vセイヴァー大会',
  *     '21:00\nブロジョ杯 ※日・韓・台・港範囲でのオンライン大会\nオンライン GGST大会',
  *     '21:00\nOkinawa Onedot\nオンライン スト6大会'
  *   ]
  * ]

  * result[3][1]:length 6
  * [
  *   '02:00\nアメリカ アークワールドツアー2024ファイナル 3日目\n海外 格闘ゲーム大会',
  *   '時間\n未確認\nV最スト6 スクリム開始日\nスト6イベント',
  *   '12:00\nTEKKEN Talk Live シーズン2＆アンナスペシャル\n鉄拳8イベント',
  *   '21:00\nOVER THE LIMIT ※参加制限あり大会\nオンライン Vセイヴァー大会',
  *   '21:00\nブロジョ杯 ※日・韓・台・港範囲でのオンライン大会\nオンライン GGST大会',
  *   '21:00\nOkinawa Onedot\nオンライン スト6大会'
  * ]
  *
result[3][1][0]
  * 02:00
  * アメリカ アークワールドツアー2024ファイナル 3日目
  * 海外 格闘ゲーム大会
*/
console.log(result.length);

/**
* 時間 \n 未確認\n V最スト6 スクリム開始日\nスト6イベント
  *
  * 12 : 00 \n TEKKEN Talk Live シーズン2＆アンナスペシャル\n鉄拳8イベント,
  *
  * 繰り返し変数 j k
  *
  * Date→ result[ j ][ 0 ]
  *
  * Hour→ result[ j ][ 1 ][ k ] の ”:” or “\n”の手前
  *
  * Minutes → result[ j ][ 1 ][ k ] の ”:”or”\n” と ”\n” の間か
  *
  * event → result[ j ][ 1 ][ k ] の ”\n” の後
* @param sentence
*/
  type timeSchedule={
    Hour:number,
    Minutes:number,
    Event:string,
  }
  type icalCalender={
    Date:number,
    Schedule:timeSchedule[],
  }

for (let j=0;j<result.length;j++){
const date:number = Number(result[j][0]);

const newIcalCalenderArray:icalCalender[] = [];
const newScheduleArray:timeSchedule[]=[];

  for (let k=0;k<result[j][1].length;k++){
  
    const modifiedSentence=result[j][1][k].replace(":", "\n"); // 置換処理

    const hour = Number( modifiedSentence.split("\n")[0]); // ":" の前の部分を取得
    const minutes = Number(modifiedSentence.split("\n")[1]);
    const event= modifiedSentence.split("\n")[2];

    const schedule:timeSchedule={Hour:hour,Minutes:minutes,Event:event};

    newScheduleArray.push(schedule)
  }

const ical: icalCalender = { Date: date, Schedule: newScheduleArray };
newIcalCalenderArray.push(ical);
console.log(newIcalCalenderArray[1])
}



  await browser.close();
})();
