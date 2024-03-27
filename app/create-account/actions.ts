"use server";

import { PW_MIN_LENGTH, PW_REGEX, PW_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";

const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const checkUnigueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: { id: true },
  });
  return !Boolean(user);
};

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
      .toLowerCase()
      .refine(checkUnigueEmail, "이미 생성된 이메일 계정입니다."),
    password: z
      .string()
      .min(PW_MIN_LENGTH, PW_REGEX_ERROR)
      .regex(
        PW_REGEX,
        "영문 대문자, 소문자, 특수문자를 모두 하나 이상 포함시켜야 합니다."
      ),
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
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
  }
}
