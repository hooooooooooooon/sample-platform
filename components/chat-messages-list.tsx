"use client";
import { InitialChatMessages } from "@/app/chats/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ChatMessageListProps {
  userId: number;
  initialMessages: InitialChatMessages;
}
export default function ChatMessagesList({
  userId,
  initialMessages,
}: ChatMessageListProps) {
  const [message, setMessages] = useState(initialMessages);
  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {message.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 items-start ${message.userId === userId ? "justify-end" : null
            }`}
        >
          {message.userId === userId ? null : (
            <Image
              src={message.user.avatar!}
              alt={message.user.username}
              width={40}
              height={40}
              className="size-12 rounded-full"
            />
          )}
          <div className={`flex flex-col gap-1 ${message.userId === userId ? "items-end" : null}`}>
            <span className={`${message.userId === userId ? "bg-neutral-600" : "bg-blue-600"} p-2.5 rounded-md`}>
              {message.payload}
            </span>
            <span className="text-xs">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
