import { HistoryDetail } from "~~/nintendo-types/alias";

export function isBankaraChallenge(detail: HistoryDetail) {
  if (detail?.vsMode.mode !== "BANKARA") {
    return false;
  }
  return detail?.bankaraMatch?.earnedUdemaePoint === null;
}

export function isXMatch(detail: HistoryDetail) {
  return detail?.vsMode.mode === "X_MATCH";
}
