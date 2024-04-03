import { Coordinates } from "@/types/map";

export const PW_MIN_LENGTH = 8;
export const PW_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PW_REGEX_ERROR =
  "비밀번호는 영문 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다.";
export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 5;
