import { message } from "antd";
import { useEffect, useRef, useState } from "react";

const useNFCReader = () => {
  const abortControllerRef = useRef(new AbortController());
  const ndef = useRef<any>();

  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if ("NDEFReader" in window) {
      //@ts-ignore
      ndef.current = new window.NDEFReader();
    }
  }, []);

  const onScanning = async (callback: (serialNumber: string) => Promise<void>) => {
    if (scanning) {
      message.error("이미 스캔 중입니다.");
      return;
    }
    if (ndef.current) {
      try {
        abortControllerRef.current = new AbortController();
        await ndef.current.scan({ signal: abortControllerRef.current.signal });
        message.success("기기를 NFC 태그에 가까이 대주세요.");
        setScanning(true);

        ndef.current.onreadingerror = () => {
          message.error("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.current.onreading = (event: any) => {
          callback(event.serialNumber);
        };
      } catch (error) {
        message.error(`Error! Scan failed to start: ${error}.`);
      }
    } else {
      message.error("NFC 리더기를 지원하지 않는 기기입니다.");
    }
  };

  const stopScanning = async () => {
    try {
      abortControllerRef.current.abort();
      message.success("스캔이 중지되었습니다.");
      setScanning(false);
    } catch (error) {
      message.error(`Error! Scan failed to stop: ${error}.`);
    }
  };

  return { onScanning, stopScanning, scanning };
};

export default useNFCReader;
