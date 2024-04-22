import Link from "next/link";

export default function AuthNav() {
  return <nav className="px-4 py-3 bg-white *:text-neutral-400 *:text-sm *:pr-4 *:font-extralight">
    <Link href="/" className="my-1 hover:underline">
      소개
    </Link>
    <Link href="/" className="my-1 hover:underline">
      앱 다운로드하기
    </Link>
    <Link href="/" className="my-1 hover:underline">
      고객센터
    </Link>
    <Link href="/" className="my-1 hover:underline">
      이용약관
    </Link>
    <Link href="/" className="my-1 hover:underline">
      개인정보 처리방침
    </Link>
    <Link href="/" className="my-1 hover:underline">
      쿠키 정책
    </Link>
    <Link href="/" className="my-1 hover:underline">
      접근성
    </Link>
    <Link href="/" className="my-1 hover:underline">
      광고 정보
    </Link>
    <Link href="/" className="my-1 hover:underline">
      블로그
    </Link>
    <Link href="/" className="my-1 hover:underline">
      브랜드 리소스
    </Link>
    <Link href="/" className="my-1 hover:underline">
      광고
    </Link>
    <Link href="/" className="my-1 hover:underline">
      마케팅
    </Link>
    <Link href="/" className="my-1 hover:underline">
      설정
    </Link>
    <div className="inline-block">
      <span>© 2024 Alphaka-Lab.</span>
    </div>
  </nav>
}