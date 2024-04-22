"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import AuthNav from "@/components/auth-nav";
import Link from "next/link";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";

export default function SignUp() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <>
      <div className="mx-auto flex max-w-screen-sm flex-col px-6 py-8">
        <div className="flex w-full px-4">
          <div className="my-auto flex w-full">
            <Link href="/">
              <ChevronDoubleLeftIcon className="size-9 text-neutral-800 hover:size-10" />
            </Link>
          </div>
          <div className="">
            <span className="text-5xl font-semibold text-neutral-800">ɑ</span>
          </div>
          <div className="w-full"></div>
        </div>
        <div className="px-8 pb-12">
          <div className="py-5 text-2xl font-semibold">알파카 가입하기</div>
          <form action={dispatch} className="flex flex-col gap-3 py-5">
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
        </div>
      </div>
      <div className="w-full px-6 flex md:fixed md:bottom-0 justify-center">
        <AuthNav />
      </div>
    </>
  );
}
