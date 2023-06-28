import Regexp from './regexp';

export function getErrorMessage(value: string | null): string | undefined {
  if (value === null || value === '') {
    return '필수 입력 항목입니다.';
  }
}

export function getPhoneNumberErrorMessage(
  value: string | null,
): string | undefined {
  if (value === null || value === '') {
    return '필수 입력 항목입니다.';
  } else if (!Regexp.phoneRegexp.test(value)) {
    return '전화번호 형식을 확인해주세요.';
  }
}

export function getEmailErrorMessage(value: string | null): string | undefined {
  if (value === null || value === '') {
    return '필수 입력 항목입니다.';
  } else if (!Regexp.emailRegexp.test(value)) {
    return '이메일 양식을 확인해주세요.';
  }
}

export function getFormClassNames(errors?: string) {
  return ['form_box', errors !== undefined ? 'form_invalid' : undefined]
    .filter(Boolean)
    .join(' ');
}

export function getHexColorErrorMessage(
  value: string | null,
): string | undefined {
  if (value === null || value === '') {
    return '색상을 선택해주세요.';
  } else if (!Regexp.haxColorRegexp.test(value)) {
    return '색상을 다시 한번 확인해주세요.';
  }
}

export function getPasswordErrorMessage(
  value: string | null,
): string | undefined {
  if (value === null || value === '') {
    return '필수 입력 항목입니다.';
  } else if (!Regexp.passwordRegexp.test(value)) {
    return '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
  }
}

export function getNameErrorMessage(value: string | null): string | undefined {
  if (value === null || value === '') {
    return '필수 입력 항목입니다.';
  } else if (!Regexp.nameRegexp.test(value)) {
    return '한글과 영문 대 소문자를 사용하세요. (특수문자, 공백 사용 불가)';
  }
}

export function getHasError(...args: (() => boolean)[]): boolean {
  const hasError = args.reduce((error, cb) => cb() || error, false);

  return hasError;
}
