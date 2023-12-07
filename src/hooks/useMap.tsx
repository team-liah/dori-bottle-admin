import { IMachine } from "@/client/machine";
import { useCallback, useRef } from "react";

const useMap = () => {
  const mapRef = useRef<naver.maps.Map>();

  const moveMap = useCallback((latitude: number, longitude: number) => {
    mapRef.current?.morph(new window.naver.maps.LatLng(latitude, longitude), 16);
  }, []);

  const addMachineMarker = useCallback((machine?: IMachine, onChangePosition?: (x: number, y: number) => void) => {
    if (mapRef.current === undefined) return;
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(
        machine?.location.latitude || 37.596578,
        machine?.location.longitude || 127.052435
      ),
      map: mapRef.current,
    });

    window.naver.maps.Event.addListener(mapRef.current, "click", (e) => {
      marker.setPosition(e.coord);
      onChangePosition?.(e.coord.x, e.coord.y);
    });
  }, []);

  const initializeMap = useCallback(() => {
    if (!window.naver.maps) return;
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.596578, 127.052435),
      zoom: 13,
      minZoom: 9,
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
    initializeMap,
  };
};
export default useMap;
