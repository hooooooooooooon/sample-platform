"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ContentTab(param: {
  id: number;
  prevUrl: string;
  postUrl: string;
  prevKey: string;
  postKey: string;
}) {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 mx-auto flex w-full h-16 border-t bg-neutral-700 px-5 py-3 *:text-neutral-200 justify-between">
      <Link
        href={`/solutions/${param.id}${param.prevUrl}`}
        className="flex items-center justify-start gap-px w-36"
      >
        <ChevronLeftIcon className="w-7 h-7" />
        <span>{param.prevKey}</span>
      </Link>
      <Link
        href="/home"
        className="w-24 flex flex-col items-center justify-center gap-px"
      >
        <HomeIcon className="w-7 h-7" />
      </Link>
      <Link
        href={`/solutions/${param.id}${param.postUrl}`}
        className="flex items-center justify-end gap-px w-36"
      >
        <span>{param.postKey}</span>
        <ChevronRightIcon className="w-7 h-7" />
      </Link>
    </div>
  );
}
