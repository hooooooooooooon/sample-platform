"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { smsLogIn } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogIn() {
  const [state, dispatch] = useFormState(smsLogIn, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">휴대폰 번호로 인증해주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="인증번호를 입력하세요."
            required
            min={100000}
            max={999999}
          />
        ) : (
          <Input
            name="phone"
            type="text"
            placeholder="휴대폰 번호를 입력하세요."
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "휴대폰 인증하기" : "인증번호 전송하기"} />
      </form>
    </div>
  );
}
