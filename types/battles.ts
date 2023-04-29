export {
  BankaraBattleHistories,
  BankaraMatchChallenge,
  BattleListNode,
  HistoryGroupItem,
  HistoryGroups,
  VsHistoryDetail,
  XBattleHistories,
} from "~/s3si.ts/src/types";

type VsRule =
  | "AREA"
  | "CLAM"
  | "TOWER"
  | /*TOWER*/ "LOFT"
  | "RAINMAKER"
  | /*RAINMAKER*/ "GOAL";

type VsRuleIdArea = "VnNSdWxlLTE=";
type VsRuleId = {
  id: VsRuleIdArea;
};
export type VsRuleRule = {
  rule: VsRule;
};
export type VsRuleLike = VsRuleId | VsRuleRule;
