
export function splitArrayByCondition(times: string[]): string[][] {
  const result: string[][] = [];
  let currentGroup: string[] = [];

  // 文字列を数値に変換するための関数
  const convertToNumber = (time: string): number | null => {
    if (time === "時間") return null; // "時間" は数字に変換できないので特別に処理
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute; // 時間を分単位で変換
  };

  for (let i = 0; i < times.length; i++) {
    const currentTime = times[i];
    const prevTime = i > 0 ? times[i - 1] : null;

    // 最初の要素はそのまま追加
    if (!prevTime) {
      currentGroup.push(currentTime);
      continue;
    }

    // 時間が減少した場合、または文字に変わった場合に分割
    if (convertToNumber(currentTime) === null || (convertToNumber(currentTime) < convertToNumber(prevTime))) {
      // 現在のグループを結果に追加
      result.push(currentGroup);
      currentGroup = []; // 新しいグループの開始
    }

    // 現在の要素を現在のグループに追加
    currentGroup.push(currentTime);
  }

  // 最後のグループを結果に追加
  if (currentGroup.length > 0) {
    result.push(currentGroup);
  }

  return result;
}


