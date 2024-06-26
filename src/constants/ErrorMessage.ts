interface IErrorMessage {
  [index: string]: string;
}

export const ERROR_MESSAGE: IErrorMessage = {
  // Common
  A000: "잠시 후 다시 시도해주세요",
  A001: "입력값을 확인해주세요",
  A006: "잘못된 접근입니다",
  A007: "로그인 상태를 확인해주세요",
  B005: "이미 등록된 컵입니다",
  C002: "이미 등록된 계정입니다",
  C004: "유효하지 않은 초대코드입니다",
  C006: "초대코드를 다시 확인해주세요",
  C007: "정지된 사용자입니다",
  C010: "미결제된 페널티가 있습니다",
  D004: "이미 등록된 기기입니다",
  G002: "등록된 결제수단이 없습니다",
  G003: "대여중인 컵이 있을 경우 결제수단이 하나 이상 필요합니다",
};
