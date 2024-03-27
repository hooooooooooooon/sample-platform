"use server";

import { PW_MIN_LENGTH, PW_REGEX, PW_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};
const formSchema = z.object({
  email: z
    .string({ required_error: "이메일을 입력해주세요." })
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "해당 이메일 계정이 존재하지 않습니다."),
  password: z.string({ required_error: "비밀번호를 입력해주세요." }),
  // .min(PW_MIN_LENGTH)
  // .regex(PW_REGEX, PW_REGEX_ERROR),
});
export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();

      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호를 입력하셨습니다."],
        },
      };
    }
  }
}
