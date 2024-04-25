import { IMachine, useAllMachines } from "@/client/machine";
import useMap from "@/hooks/useMap";
import { IMarker } from "@/types/map";
import { Switch } from "antd";
import Script from "next/script";
import { useEffect, useState } from "react";

interface INaverMapProps {
  initialValues: IMachine;
  onChagePosition: (x: number, y: number) => void;
}

//#region Styled Component

//#endregion

const NaverMap = ({ initialValues, onChagePosition }: INaverMapProps) => {
  const [mapLoading, setMapLoading] = useState(true);
  const [showAllMachines, setShowAllMachines] = useState(false);
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const { initializeMap, addNewMachineMarker, addMachineMarker, moveMap } = useMap();
  const onReady = () => {
    initializeMap();
    addNewMachineMarker(initialValues, (x, y) => onChagePosition(x, y));
    moveMap(initialValues?.location?.latitude || 37.5512698, initialValues?.location?.longitude || 126.98822);
    setMapLoading(false);
  };

  const { data } = useAllMachines();

  useEffect(() => {
    if (mapLoading) return;
    if (showAllMachines) {
      data?.content.forEach((machine) => {
        const marker = addMachineMarker(machine);
        setMarkers((prev) => [...prev, { machine, marker }]);
      });
    } else {
      markers.forEach((marker) => {
        marker.marker?.setMap(null);
      });
      setMarkers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, addMachineMarker, showAllMachines, mapLoading, initialValues]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={onReady}
      />
      <div className="flex flex-row justify-end w-full gap-4 mb-4">
        <span className="flex items-center text-sm text-gray-500 ">기기 전체 보기</span>
        <Switch checked={showAllMachines} onChange={(e) => setShowAllMachines(e.valueOf())} />
      </div>
      <div id={"map"} style={{ width: "100%", height: "400px", position: "relative" }}></div>
    </>
  );
};

export default NaverMap;
