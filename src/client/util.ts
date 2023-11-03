import ky from "ky-universal";

export interface IUploadFileResponse {
  key: React.Key;
  url: string;
}

export const uploadFile: (file: File) => Promise<IUploadFileResponse> = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return ky.post(`/api/asset/upload`, { body: formData }).json();
};
