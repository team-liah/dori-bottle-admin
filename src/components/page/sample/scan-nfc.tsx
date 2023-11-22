import { Button } from "antd";

interface IScanButtonProps {}

//#region Styled Component

//#endregion

const ScanButton = (props: IScanButtonProps) => {
  const scan = async () => {
    if ("NDEFReader" in window) {
      try {
        //@ts-ignore
        const ndef = new window.NDEFReader();
        await ndef.scan();

        alert("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event: any) => {
          console.log("NDEF message read.");
          onReading(event); //Find function below
        };
      } catch (error) {
        alert(`Error! Scan failed to start: ${error}.`);
      }
    } else {
      alert("Web NFC is not supported.");
    }
  };

  const onReading = ({ message, serialNumber }: any) => {
    console.log(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          alert(textDecoder.decode(record.data));
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };
  return (
    <div className="mt-5">
      <Button size="large" type="default" htmlType="submit" className="w-full" onClick={scan}>
        스캐닝 테스트
      </Button>
    </div>
  );
};

export default ScanButton;
