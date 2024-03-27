"use server";

import { PW_MIN_LENGTH, PW_REGEX, PW_REGEX_ERROR } from "@/lib/constants";
import z from "zod";

const formSchema = z.object({
  email: z
    .string({ required_error: "이메일을 입력해주세요." })
    .email()
    .toLowerCase(),
  password: z
    .string({ required_error: "비밀번호를 입력해주세요." })
    .min(PW_MIN_LENGTH)
    .regex(PW_REGEX, PW_REGEX_ERROR),
});
export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    result.data;
  }
}
