import TabBar from "@/components/tab-bar";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { ArrowLeftEndOnRectangleIcon, BellAlertIcon, Cog6ToothIcon, InformationCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    return user;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <>
      <div className="max-w-screen-sm mx-auto mt-5">
        <div className="flex flex-col mx-5 gap-1">
          <div>
            <Link href="/home" className="flex flex-col items-end gap-px">
              <Cog6ToothIcon className="between w-7 h-7 text-neutral-800" />
            </Link>
          </div>
          <div className="flex justify-between items-center pb-5">
            <div className="flex items-center">
              <div className="size-16 overflow-hidden rounded-full">
                {user!.avatar !== null ? (
                  <Image
                    src={user!.avatar}
                    width={64}
                    height={64}
                    alt={user!.username}
                  />
                ) : (
                  <div className="bg-neutral-400 h-16 flex items-center justify-center">
                    <UserIcon className="size-12 text-neutral-200" />
                  </div>
                )}
              </div>
              <div className="pl-3 text-2xl font-semibold">
                {user?.username}
              </div>
            </div>
            <div>
              <button className="w-full rounded-md bg-gradient-to-r bg-neutral-600 h-10 text-center text-sm px-3 font-semibold text-neutral-200">
                프로필 보기
              </button>
            </div>
          </div>
          <div className="my-1 py-3 flex flex-col w-full gap-4 border-y-[1px] border-neutral-200">
            <button className="px-3 py-1 w-full flex justify-between">
              <div className="flex items-center">
                <QuestionMarkCircleIcon className="size-5 text-neutral-600" />
                <h6 className="pl-2 font-medium">자주 묻는 질문</h6>
              </div>
              <ChevronRightIcon className="size-6 text-neutral-600" />
            </button>
            <button className="px-3 py-1 w-full flex justify-between">
              <div className="flex items-center">
                <BellAlertIcon className="size-5 text-neutral-600" />
                <h6 className="pl-2 font-medium">공지사항</h6>
              </div>
              <ChevronRightIcon className="size-6 text-neutral-600" />
            </button>
            <button className="px-3 py-1 w-full flex justify-between">
              <div className="flex items-center">
                <InformationCircleIcon className="size-5 text-neutral-600" />
                <h6 className="pl-2 font-medium">약관 및 정책</h6>
              </div>
              <ChevronRightIcon className="size-6 text-neutral-600" />
            </button>
          </div>
          <div className="my-1 py-3 flex flex-col w-full gap-4 border-y-[1px] border-neutral-200">
            <form action={logOut}>
              <button className="px-3 py-1 w-full flex justify-between">
                <div className="flex items-center">
                  <ArrowLeftEndOnRectangleIcon className="size-5 text-neutral-600" />
                  <h6 className="pl-2 font-medium">로그아웃</h6>
                </div>
                <ChevronRightIcon className="size-6 text-neutral-600" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <TabBar />
    </>
  );
}
