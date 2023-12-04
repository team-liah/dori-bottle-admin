import { fetchApi } from "./base";

export type PenaltyType = "DAMAGED_CUP" | "NON_MANNER" | "ETC";
export const PENALTY_TYPES: PenaltyType[] = ["DAMAGED_CUP", "NON_MANNER", "ETC"];

export type BlockCauseType = "FIVE_PENALTIES" | "LOST_CUP_PENALTY";
export const BLOCK_CAUSE_TYPES: BlockCauseType[] = ["FIVE_PENALTIES", "LOST_CUP_PENALTY"];

export interface IPenalty {
  id: React.Key;
  userId: React.Key;
  penaltyType: PenaltyType;
  description: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface IBlockCause {
  id: React.Key;
  userId: React.Key;
  type: BlockCauseType;
  description?: string;
  createdDate?: string;
  lastModifiedDate?: string;
  clearPrice?: number;
}

export const setUserPenalty = (id: React.Key) => {
  return fetchApi.post(`/api/user/${id}/penalty`);
};

export const deleteUserPenalty = (id: React.Key, penaltyId: React.Key) => {
  return fetchApi.delete(`/api/user/${id}/penalty/${penaltyId}`);
};

export const getPenaltyTypeLabel = (type?: PenaltyType) => {
  switch (type) {
    case "DAMAGED_CUP":
      return "파손된 컵 반납";
    case "NON_MANNER":
      return "비매너 행동";
    case "ETC":
      return "기타";
    default:
      return "";
  }
};

export const getBlockCauseTypeLabel = (type?: BlockCauseType) => {
  switch (type) {
    case "FIVE_PENALTIES":
      return "페널티 5개 이상";
    case "LOST_CUP_PENALTY":
      return "분실 컵 페널티";
    default:
      return "";
  }
};
