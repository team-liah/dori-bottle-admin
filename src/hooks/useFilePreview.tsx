import { useState } from "react";

const useFilePreview = () => {
  const [originFile, setOriginFile] = useState<File | undefined>(undefined);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(undefined);

  const handleFileChange = (file?: File) => {
    if (!file) return;
    setOriginFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImageUrl(reader.result as string);
    };
  };
  return {
    originFile,
    previewImageUrl,
    handleFileChange,
  };
};
export default useFilePreview;
