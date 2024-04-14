"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import { PW_MIN_LENGTH } from "@/lib/constants";

export default function SignUp() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">가입을 위해 아래의 내용을 입력해주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="성함"
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          name="email"
          type="text"
          placeholder="이메일"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          required
          errors={state?.fieldErrors.confirmPassword}
        />
        <Button text="회원가입하기" />
      </form>
      <SocialLogin />
    </div>
  );
}
