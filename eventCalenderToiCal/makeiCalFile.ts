const example: icsCalender[] = [
  { Date: 20201210, Hour: 13, Minutes: 49, Event: "My Birthday" },
  { Date: 20211229, Hour: 21, Minutes: 56, Event: "My Friend's Birthday" },
  { Date: 20211130, Hour: 24, Minutes: 36, Event: "My Mother's Birthday" },
  { Date: 20210227, Hour: 25, Minutes: 61, Event: "My Friend's Birthday" }
];

/**
*
* ical形式
* BEGIN:VCALENDAR\r\n
* VERSION:2.0\r\n
* PRODID:kunihiros iCalender\r\n
*
* BEGIN:VEVENT
* DTSTART;TZID=Asia/Tokyo:20201123T000000\r\n
* DTEND;TZID=Asia/Tokyo:20201123T235959\r\n
* SUMMARY:My Birthday Party\r\n
* END:VEVENT\r\n
*
* BEGIN:VEVENT
* DTSTART;TZID=Asia/Tokyo:20201123T000000\r\n
* DTEND;TZID=Asia/Tokyo:20201123T235959\r\n
* SUMMARY:My Birthday Party\r\n
* END:VEVENT\r\n
*
* END:VCALENDAR
*
 * Hourが25かつminutesが61の場合，
*  - DTEND=Date+1(時間未確定なので終日)
*  - Hourとminutesは0にする
*  それ以外なら
*  - DTEND=Hour+1(最低時間単位)
*/

const STARTICS = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:kakuge-checker iCalender\r\n";
const ENDICS = "END:VCALENDAR\r\n";

export type icsCalender = {
  Date: number;
  Hour: number;
  Minutes: number;
  Event: string;
};

//Hourを2桁にする
const padZero = (num: number) => num.toString().padStart(2, '0');

//次の日を作成
const getNextDay=(date:number):string=>{
    const dateString=date.toString();

    const yaer=parseInt(dateString.slice(0,4),10)
    const month=parseInt(dateString.slice(4,6),10)-1
    const day =parseInt(dateString.slice(6,8),10)

    const newDate=new Date(yaer,month,day)
    newDate.setDate(newDate.getDate()+1)

    const nextYear=newDate.getFullYear()
    const nextMonth=String(newDate.getMonth()+1).padStart(2,"0")
    const nextDay=String(newDate.getDate()).padStart(2,"0")

    return `${nextYear}${nextMonth}${nextDay}`
}

//DTSTART;TZID=Asia/Tokyo:20201123T000000\r\n
const makeDTSTART=(date:number ,hour:number,minutes:number)=>{
   return  "BEGIN:VEVENT\r\nDTSTART;TZID=Asia/Tokyo:"+String(date)+"T"+padZero(hour)+padZero(minutes)+"\r\n";
}
//DTEND;TZID=Asia/Tokyo:20201123T235959\r\n
const makeDTEND=(date:number,hour:number,minutes:number)=>{
  if(hour===25&&minutes===61){
    return "DTEND;TZID=Asia/Tokyo:"+getNextDay(date)+"T000000\r\n";
  }else if(hour===24){
     return  "DTEND;TZID=Asia/Tokyo:"+date+"T"+padZero(hour)+"59\r\n";
  }else{
    return "DTEND;TZID=Asia/Tokyo:"+date+"T"+padZero(hour+1)+padZero(minutes)+"\r\n";
  }
}
//SUMMARY:My Birthday Party\r\nEND:VEVENT\r\n
const makeSummary=(title: string)=> {
   return `SUMMARY:${title}\r\nEND:VEVENT\r\n`;
}

export const makeIcsText=(calender:icsCalender[])=>{
    let icsString = STARTICS;
    for (let i = 0; i < calender.length; i++) {
        const { Date, Hour, Minutes, Event } = calender[i];
        icsString=icsString + makeDTSTART(Date, Hour, Minutes) + makeDTEND(Date, Hour, Minutes) + makeSummary(Event);
    }
    icsString=icsString + ENDICS;
    return icsString;
}

//console.log(makeIcsText(example));