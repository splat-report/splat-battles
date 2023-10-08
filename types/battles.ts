import {
  BankaraBattleHistories,
  BankaraMatchChallenge,
  BattleListNode,
  HistoryGroupItem,
  HistoryGroups,
  VsHistoryDetail,
  XBattleHistories,
  VsRule,
} from "~/s3si.ts/src/types";

export {
  BankaraBattleHistories,
  HistoryGroupItem,
  VsHistoryDetail,
}

export type VsRuleLike = {
  id: VsHistoryDetail['vsRule']['id']
} | { rule: VsHistoryDetail['vsRule']['rule'] };
