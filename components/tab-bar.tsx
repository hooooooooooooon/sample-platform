"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  const iconSize = "w-5 h-5"
  const fontSize = "text-base"
  return (
    <div className="fixed bottom-0 w-full h-16 bg-neutral-800">
      <div className="mx-auto max-w-screen-sm grid grid-cols-5 border-neutral-500 border-t px-5 py-3 *:text-neutral-200">
        <Link href="/home" className="flex flex-col items-center gap-px">
          {pathname === "/home" ? (
            <SolidHomeIcon className={iconSize} />
          ) : (
            <OutlineHomeIcon className={iconSize} />
          )}
          <span className={fontSize}>홈</span>
        </Link>
        <Link href="/community" className="flex flex-col items-center gap-px">
          {pathname === "/community" ? (
            <SolidNewspaperIcon className={iconSize} />
          ) : (
            <OutlineNewspaperIcon className={iconSize} />
          )}
          <span className={fontSize}>커뮤니티</span>
        </Link>
        <Link href="/chats" className="flex flex-col items-center gap-px">
          {pathname === "/chats" ? (
            <SolidChatIcon className={iconSize} />
          ) : (
            <OutlineChatIcon className={iconSize} />
          )}
          <span className={fontSize}>채팅</span>
        </Link>
        <Link href="/live" className="flex flex-col items-center gap-px">
          {pathname === "/live" ? (
            <SolidVideoCameraIcon className={iconSize} />
          ) : (
            <OutlineVideoCameraIcon className={iconSize} />
          )}
          <span className={fontSize}>강연</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-px">
          {pathname === "/profile" ? (
            <SolidUserIcon className={iconSize} />
          ) : (
            <OutlineUserIcon className={iconSize} />
          )}
          <span className={fontSize}>내 정보</span>
        </Link>
      </div>
    </div>
  );
}
