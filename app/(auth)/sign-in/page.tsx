"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { singIn } from "./actions";
import AuthNav from "@/components/auth-nav";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SignIn() {
  const [state, dispatch] = useFormState(singIn, null);
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
          <div className="py-5 text-2xl font-semibold">알파카 로그인하기</div>
          <SocialLogin />
          <form action={dispatch} className="flex flex-col gap-3 py-5">
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
            <Button text="로그인하기" />
          </form>
        </div>
      </div>
      <div className="w-full px-6 flex md:fixed md:bottom-0 justify-center">
        <AuthNav />
      </div>
    </>
  );
}
