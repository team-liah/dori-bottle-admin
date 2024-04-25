import { IMachine } from "@/client/machine";
import useMap from "@/hooks/useMap";
import Script from "next/script";

interface INaverMapProps {
  initialValues: IMachine;
  onChagePosition: (x: number, y: number) => void;
}

//#region Styled Component

//#endregion

const NaverMap = ({ initialValues, onChagePosition }: INaverMapProps) => {
  const { initializeMap, addNewMachineMarker, moveMap } = useMap();
  const onReady = () => {
    initializeMap();
    addNewMachineMarker(initialValues, (x, y) => onChagePosition(x, y));
    moveMap(initialValues?.location?.latitude || 37.5512698, initialValues?.location?.longitude || 126.98822);
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={onReady}
      />
      <div id={"map"} style={{ width: "100%", height: "400px" }} />
    </>
  );
};

export default NaverMap;
