import qs from "qs";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";

export type MachineType = "VENDING" | "COLLECTION" | "WASHING";
export const MACHINE_TYPES: MachineType[] = ["VENDING", "COLLECTION", "WASHING"];

export type MachineState = "NORMAL" | "MALFUNCTION" | "PAUSE";
export const MACHINE_STATES: MachineState[] = ["NORMAL", "MALFUNCTION", "PAUSE"];

export interface IAddress {
  zipCode: string;
  address1: string;
  address2: string;
}

export interface IMachine {
  id: React.Key;
  no: string;
  name: string;
  type: MachineType;
  address: IAddress;
  capacity: number;
  cupAmounts: number;
  state: MachineState;
  location: {
    latitude: number;
    longitude: number;
  };
  imageUrl?: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface IMachineFormValue extends Omit<IMachine, "id"> {}

export interface IMachinesParams {
  no?: string;
  name?: string;
  type?: MachineType;
  state?: MachineState;
  addressKeyword?: string;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface IMachinesResponse {
  content: IMachine[];
  pageable: IPageable;
}

export const useMachines = (params: IMachinesParams = {}) => {
  return useSWR<IMachinesResponse>(`/api/machine?${qs.stringify(params)}`);
};

export const useAllMachines = () => {
  return useSWR<IMachinesResponse>(`/api/machine?size=1000`);
};

export const useVendingMachinesInfinity = (params: IMachinesParams = {}) => {
  return useSWRInfinite<IMachinesResponse>(
    (index) => `/api/machine?${qs.stringify({ ...params, type: "VENDING", page: index })}`
  );
};

export const useCollectionMachinesInfinity = (params: IMachinesParams = {}) => {
  return useSWRInfinite<IMachinesResponse>(
    (index) => `/api/machine?${qs.stringify({ ...params, type: "COLLECTION", page: index })}`
  );
};

export const useMachine = (id: React.Key) => {
  return useSWR<IMachine>(`/api/machine/${id}`);
};

export const createMachine = (value: IMachineFormValue) => {
  return fetchApi.post("/api/machine", { body: JSON.stringify(value) });
};

export const updateMachine = (id: React.Key, value: IMachineFormValue) => {
  return fetchApi.patch(`/api/machine/${id}`, { body: JSON.stringify(value) });
};

export const deleteMachines = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.delete(`/api/machine/${id}`);
  }

  return Promise.resolve();
};

export const getMachineTypeLabel = (type?: MachineType) => {
  switch (type) {
    case "VENDING":
      return "자판기";
    case "COLLECTION":
      return "수거함";
    case "WASHING":
      return "세척기";
    default:
      return "";
  }
};

export const getMachineStateLabel = (state?: MachineState) => {
  switch (state) {
    case "NORMAL":
      return "✅ 정상";
    case "MALFUNCTION":
      return "⛔️ 고장";
    case "PAUSE":
      return "⏸ 일시정지";
    default:
      return "";
  }
};
