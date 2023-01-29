import {
  GraphQLResponse,
  Queries,
  RespMap,
  XBattleHistories,
} from "~/s3si.ts/src/types";

export import PersistedQuery = Queries;

export type PersistedResponse<Q extends PersistedQuery> = GraphQLResponse<
  RespMap[Q]
>;
export type PersistedSuccessResponse<Q extends PersistedQuery> = Extract<
  PersistedResponse<Q>,
  { data: RespMap<Q> }
>;

/********************************************* */

export type XMatchResponse = GraphQLResponse<
  RespMap[Queries.XBattleHistoriesQuery]
>;
export type XMatchResponseSuccess = Extract<
  XMatchResponse,
  { data: XBattleHistories }
>;
