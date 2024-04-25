import { IMachine } from "@/client/machine";

export interface IMarker {
  machine: IMachine;
  marker?: naver.maps.Marker;
}
