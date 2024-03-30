"use client";

import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { redirect, useRouter } from "next/navigation";

export default function Modal({ params }: { params: { id: string } }) {
  if (Number(params.id)) {
    const router = useRouter();
    const onCloseClick = () => {
      router.back();
    };
    return (
      <div className="absolute w-full h-full z-50 flex items-center justify-center bg-neutral-900 bg-opacity-80 left-0 top-0">
        <button
          onClick={onCloseClick}
          className="absolute right-5 top-5 text-neutral-200"
        >
          <XMarkIcon className="size-10" />
        </button>
        <div className="max-w-screen-sm h-1/2 flex justify-center w-full">
          <div className="aspect-square bg-neutral-600 text-neutral-200 rounded-md flex justify-center items-center">
            <PhotoIcon className="h-28" />
          </div>
        </div>
      </div>
    );
  } else {
    // Modal에서 어떻게 탈출할 수 있는지? 다른 방법은 products/add 페이지를 분리시켜야할듯
  }
}
