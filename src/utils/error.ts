import { ERROR_MESSAGE } from "@/constants/ErrorMessage";
import { HTTPError } from "ky";

export async function getErrorMessage(error: unknown) {
  if (error instanceof HTTPError) {
    const response = await error.response.json();
    return ERROR_MESSAGE[response.code] || ERROR_MESSAGE["A000"];
  }
  if (error instanceof Error) return error.message;

  return String(error);
}
