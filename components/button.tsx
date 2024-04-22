"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-neutral-800 text-center text-base font-semibold text-neutral-200 transition-colors duration-500 hover:bg-neutral-900 disabled:bg-neutral-400 disabled:text-neutral-200 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중..." : text}
    </button>
  );
}
