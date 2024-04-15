import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-400" />
      <div className="flex flex-col gap-3">
        <Link
          className="flex h-10 w-full items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#fee500] to-[#f4dc00] text-center font-medium transition-colors duration-500 hover:from-[#f4dc00] hover:to-[#fee500]"
          href="/github/start"
        >
          <span>
            <ChatBubbleOvalLeftIcon className="h-5 w-5 text-black" />
          </span>
          <span className="text-xl font-bold text-black">KAKAO</span>
          <span className="text-black"> 로그인</span>
        </Link>
        <Link
          className="flex h-10 w-full items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[#03c75a] to-[#17b75e] text-center font-medium text-white transition-colors duration-500 hover:from-[#17b75e] hover:to-[#03c75a]"
          href="/github/start"
        >
          <span className="text-xl font-[1000]">N</span>
          <span className="text-xl font-bold">NAVER</span>
          <span> 로그인</span>
        </Link>
      </div>
    </>
  );
}
