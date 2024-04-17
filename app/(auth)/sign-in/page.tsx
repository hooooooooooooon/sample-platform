"use client"

import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { singIn } from "./actions";
import { PW_MIN_LENGTH } from "@/lib/constants";

export default function SignIn() {

  const [state, dispatch] = useFormState(singIn, null);
  return (
    <div className="mx-auto flex max-w-screen-sm flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">이메일을 통해 로그인해주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          minLength={PW_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="로그인하기" />
      </form>
      <SocialLogin />
    </div>
  );
}
