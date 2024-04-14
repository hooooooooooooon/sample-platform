export const PW_MIN_LENGTH = 8;
export const PW_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PW_REGEX_ERROR =
  "비밀번호는 영문 소문자, 대문자, 숫자, 특수문자를 모두 하나 이상 포함시켜야 합니다.";
