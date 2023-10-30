import { HTTPError } from "ky";

export function getErrorMessage(error: unknown) {
  if (error instanceof HTTPError) console.log(error);
  // if (error.response?.data?.code as keyof typeof ERROR_MESSAGE) {
  //   return ERROR_MESSAGE[error.response?.data.code] || ERROR_MESSAGE["A000"];
  // } else {
  //   return error.message;
  // }
  if (error instanceof Error) return error.message;

  return String(error);
}
