import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-400" />
      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3 bg-[#fee500] hover:bg-[#f4dc00]"
          href="/github/start"
        >
          <span>
            <ChatBubbleOvalLeftIcon className="h-5 w-5 text-black" />
          </span>
          <span className="text-xl font-bold text-black">KAKAO</span><span className="text-black"> 로그인</span>
        </Link>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3 bg-[#03c75a] hover:bg-[#17b75e]"
          href="/github/start"
        >
          <span className="text-xl font-[1000]">N</span><span className="text-xl font-bold">NAVER</span><span > 로그인</span>
        </Link>
      </div>
    </>
  );
}
