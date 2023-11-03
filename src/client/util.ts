import { fetchFormDataApi } from "./base";

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetchFormDataApi.post(`/api/asset/upload`, { body: formData });
};
