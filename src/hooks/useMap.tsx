import { IMachine, MachineType } from "@/client/machine";
import { useCallback, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const useMap = () => {
  const mapRef = useRef<naver.maps.Map>();

  const moveMap = useCallback((latitude: number, longitude: number) => {
    mapRef.current?.morph(new window.naver.maps.LatLng(latitude, longitude), 16);
  }, []);

  const addNewMachineMarker = useCallback((machine?: IMachine, onChangePosition?: (x: number, y: number) => void) => {
    if (mapRef.current === undefined) return;
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(
        machine?.location.latitude || 37.5512698,
        machine?.location.longitude || 126.98822
      ),
      map: mapRef.current,
      zIndex: 1000,
    });

    window.naver.maps.Event.addListener(mapRef.current, "click", (e) => {
      marker.setPosition(e.coord);
      onChangePosition?.(e.coord.x, e.coord.y);
    });
  }, []);

  // 기계 마커 추가
  const addMachineMarker = useCallback(
    (machine: IMachine, onClickMachine?: () => void) => {
      if (mapRef.current === undefined) return;
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(machine.location.latitude, machine.location.longitude),
        map: mapRef.current,
        icon: {
          content: renderToStaticMarkup(
            MarkerComponent({
              type: machine.type,
              selected: false,
              disabled: false,
            })
          ),
          size: new window.naver.maps.Size(32, 32),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(16, 45),
        },
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        moveMap(machine.location.latitude, machine.location.longitude);
        onClickMachine?.();
      });

      return marker;
    },
    [moveMap]
  );

  const initializeMap = useCallback(() => {
    if (!window.naver.maps) return;
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5512698, 126.98822),
      zoom: 13,
      minZoom: 7,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map("map", mapOptions);
    mapRef.current = map;
  }, []);

  return {
    moveMap,
    addMachineMarker,
    addNewMachineMarker,
    initializeMap,
  };
};
export default useMap;

interface IMarkerComponentProps {
  type: MachineType;
  selected: boolean;
  disabled: boolean;
}

const MarkerComponent: any = ({ type, selected, disabled }: IMarkerComponentProps) => {
  return (
    <div
      className={`${selected && "animate-bounce-scale"}`}
      style={{
        width: "32px",
        height: "56px",
        backgroundImage: `url(${type === "VENDING" ? "/assets/pin_rental.png" : "/assets/pin_collection.png"})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        opacity: disabled ? 0.3 : 1,
      }}
    />
  );
};
