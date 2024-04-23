import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SocialLogin({ signedUp }: { signedUp: boolean }) {
  const comment = signedUp === true ? " 계정으로 로그인" : " 계정으로 가입하기"
  return (
    <>
      <div className="mb-4">
        <Link href="/kakao/start">
          <div className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fee500] to-[#f4dc00] text-center text-base font-semibold text-black transition-colors duration-500 hover:from-[#f4dc00] hover:to-[#fee500]">
            <span>
              <ChatBubbleOvalLeftIcon className="size-5 text-neutral-800" />
            </span>
            <span className="text-base font-bold text-neutral-800">KAKAO</span>
            <span className="text-base text-neutral-800">
              {comment}
            </span>
          </div>
        </Link>
      </div>
      <div className="mb-4">
        <Link href="/naver/start">
          <div className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#03c75a] to-[#17b75e] text-center text-base font-semibold text-white transition-colors duration-500 hover:from-[#17b75e] hover:to-[#03c75a]">
            <span className="text-xl font-[1000]">N</span>
            <span className="text-base font-bold">NAVER</span>
            <span className="text-base">{comment}</span>
          </div>
        </Link>
      </div>
      <div className="mb-4">
        <div className="flex my-1 justify-center items-center">
          <div className="mx-1 h-[1px] bg-neutral-400 justify-center w-full"></div>
          <div className="mx-1 ">
            <div className="w-8 *:text-neutral-800">
              <span>또는</span>
            </div>
          </div>
          <div className="mx-1 h-[1px] bg-neutral-400 justify-center w-full"></div>
        </div>
      </div>
    </>
  );
}
