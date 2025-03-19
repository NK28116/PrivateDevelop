const example: OwnCalendar[] = [
  { Date: 20201210, Hour: 13, Minutes: 49, Event: "My Birthday" },
  { Date: 20211229, Hour: 21, Minutes: 56, Event: "My Friend's Birthday" }
];


const STARTICS = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:kunihiros iCalender\r\n";
const ENDICS = "END:VCALENDAR\r\n";

type OwnCalendar = {
  Date: number;
  Hour: number;
  Minutes: number;
  Event: string;
};

function padZero(num: number): string {
  return num.toString().padStart(2, '0'); // 1桁をゼロパディング
}

function makeDtTime(yyyymmdd: number, hh: number, mm: number) {
  return `TZID=Asia/Tokyo:${yyyymmdd}T${padZero(hh)}${padZero(mm)}\r\n`;
}

function makeSummary(title: string) {
  return `SUMMARY:${title}\r\nEND:VEVENT\r\n`;
}

function makeiCalBlock(event: OwnCalendar) {
  return `BEGIN:VEVENT\r\nDTSTART;${makeDtTime(event.Date, event.Hour, event.Minutes)}DTEND;${makeDtTime(event.Date, event.Hour, event.Minutes)}${makeSummary(event.Event)}`;
}

function makeiCalText() {
  let body = example.map(event => makeiCalBlock(event)).join('');
  return STARTICS + body + ENDICS;
}

// iCalファイルを作成
const icsData = makeiCalText();
console.log(icsData);
