import { Regex } from "@/constants/Regex";

export const getHypenTel = (tel: string) => {
  return tel.replace(Regex.ONLY_NUMBER_REGEX, "").replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
};

export const getOnlyNumber = (str: string) => {
  return str.replace(Regex.ONLY_NUMBER_REGEX, "");
};

export const getTimeFormat = (second: number) => {
  const min = Math.floor(second / 60);
  const sec = second % 60;

  return `${min}:${sec < 10 ? `0${sec}` : sec}`;
};

export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const copyToClipboard = async (shareTarget: string, callback: () => void) => {
  await navigator.clipboard.writeText(shareTarget);
  callback();
};

export const getMonthName = (month: number) => {
  const monthNames = [
    "",
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE ",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER ",
    "DECEMBER",
  ];

  return monthNames[month];
};

export const isEmpty = (value: any) => {
  if (value === null || value === undefined || value === "") {
    return true;
  }
  return false;
};
