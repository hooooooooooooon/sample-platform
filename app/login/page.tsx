"use client"

import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function LogIn() {

  const [state, dispatch] = useFormState(handleForm, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
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
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <Button text="로그인하기" />
      </form>
      <SocialLogin />
    </div>
  );
}
