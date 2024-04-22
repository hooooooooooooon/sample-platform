import AuthNav from "@/components/auth-nav";
import SocialLogin from "@/components/social-login";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen p-4 md:p-0">
      <div className="flex flex-col md:flex-row p-5 md:p-0 md:h-full">
        <div className="flex md:my-auto w-full md:justify-center">
          <span className="md:text-[512px] text-5xl text-neutral-800 md:p-8 pb-3 font-semibold">
            ɑ
          </span>
        </div>
        <div className="w-full md:p-4 md:my-auto md:pb-10">
          <div className="md:p-4">
            <div className="flex flex-col *:text-neutral-800 my-10 md:my-12">
              <span className="my-auto text-4xl font-semibold mb-5">
                알파카
              </span>
              <span className="my-auto text-4xl font-semibold">
                건축을 위한 모든 것
              </span>
            </div>
            <div className="*:text-neutral-800 mb-5 md:mb-8">
              <span className="text-2xl font-semibold">지금 가입하세요.</span>
            </div>
            <div className="md:w-96 w-full">
              <SocialLogin />
              <div className="mb-2">
                <Link href="/sign-up" className="text-black">
                  <div className="mb-4 hover:bg-neutral-800 w-full h-10 rounded-full bg-neutral-900 font-semibold text-center text-neutral-200 content-center">
                    계정 만들기
                  </div>
                </Link>
              </div>
              <div className="mb-5 text-neutral-400 text-xs">
                가입하시려면 <Link href="/">쿠키 사용</Link>을 포함해{" "}
                <Link href="/">이용약관</Link>과{" "}
                <Link href="/">개인정보 처리방침</Link>에 동의해야 합니다.
              </div>
              <div className="mt-10">
                <div className="mb-5">
                  <span className="text-neutral-800 font-semibold text-lg">
                    이미 알파카에 가입하셨나요?
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <Link href="/sign-in" className="*:text-neutral-800">
                  <div className="hover:bg-neutral-200 w-full h-10 border-neutral-400 border-[1px] rounded-full font-semibold text-center content-center">
                    로그인
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex md:fixed md:bottom-0 justify-center">
        <AuthNav />
      </div>
    </div>
  );
}
