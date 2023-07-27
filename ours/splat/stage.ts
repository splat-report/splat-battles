const PARTIAL_STAGE_SHORT_NAMES = {
  "海女美術大学": "アマビ",
  "スメーシーワールド": "スメシ",
  "マヒマヒリゾート＆スパ": "マヒマヒ",
  "ザトウマーケット": "ザトウ",
  "マンタマリア号": "マンタ",
  "タラポートショッピングパーク": "タラポート",
} as { [name: string]: string };

/** Assuming name in ja-JP */
export function abbreviateStageName(name: string) {
  const short = PARTIAL_STAGE_SHORT_NAMES[name];
  if (short) {
    return short;
  }

  const [leadingKatakana] = name.match(/^([\p{Script=Katakana}ー]+)/gu) ||
    [null];
  if (leadingKatakana) {
    return leadingKatakana;
  }

  return name;
}
