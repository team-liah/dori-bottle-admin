import { getBase64 } from "@/utils/util";
import { Modal, Upload, UploadFile } from "antd";
import { UploadProps } from "antd/lib";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface IImagePreviewProps {
  initialValues?: string;
  onChange?: (file: File) => void;
}

const ImagePreview = ({ initialValues, onChange }: IImagePreviewProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList[0]?.status === "done") {
      onChange?.(newFileList[0]?.originFileObj as File);
    }
  };

  useEffect(() => {
    if (initialValues) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: initialValues,
        },
      ]);
    }
  }, [initialValues]);

  return (
    <>
      <Upload
        accept="image/*"
        listType="picture-card"
        maxCount={1}
        fileList={fileList}
        // Preview를 위해 임시로 onSuccess를 사용
        customRequest={({ onSuccess }) =>
          setTimeout(() => {
            onSuccess?.("ok");
          }, 0)
        }
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length > 0 ? null : (
          <button style={{ border: 0, background: "none" }} type="button">
            <Plus className="mx-auto stroke-[1.5px]" />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        )}
      </Upload>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImagePreview;
