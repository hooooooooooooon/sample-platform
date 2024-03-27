"use server";

import { PW_MIN_LENGTH, PW_REGEX, PW_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "올바른 형식의 성함을 입력해주세요.",
        required_error: "성함을 입력해주세요.",
      })
      .trim()
      .min(2, "2글자 이상의 성함을 입력해주세요.")
      .max(20, "20글자 이하의 성함을 입력해주세요."),
    email: z
      .string({ required_error: "이메일을 입력해주세요." })
      .trim()
      .email({ message: "올바른 형식의 이메일을 입력해주세요." })
      .toLowerCase(),
    password: z.string().min(PW_MIN_LENGTH, PW_REGEX_ERROR).regex(PW_REGEX),
    confirmPassword: z.string(),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

const usernameSchema = z.string().min(5).max(10);

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    result.data;
  }
}
