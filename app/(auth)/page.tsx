import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 max-w-screen-sm mx-auto">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🦙</span>
        <h1 className="text-4xl font-extrabold">Alpha.K.A</h1>
        <h2>건축 플랫폼 알파카에 오신 것을 환영합니다.</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          href="/sign-up"
          className="primary-btn text-lg py-2.5"
        >
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">로그인</Link>
        </div>
      </div>
    </div>
  );
}
