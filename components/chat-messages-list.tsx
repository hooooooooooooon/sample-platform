"use client";

import { InitialChatMessages } from "@/app/chats/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { saveMessage } from "@/app/chats/[id]/actions";

const SUPABASE_URL = "https://debehsiuxaueobimotnh.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlYmVoc2l1eGF1ZW9iaW1vdG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5MzYyNTUsImV4cCI6MjAyNzUxMjI1NX0.3f7AMD31ouXdyebkXTIHvrBCoAFnhv0M_S3qKpB_eyk";

interface ChatMessageListProps {
  chatRoomId: string;
  userId: number;
  initialMessages: InitialChatMessages;
  username: string;
  avatar: string;
}
export default function ChatMessagesList({
  chatRoomId,
  userId,
  initialMessages,
  username,
  avatar,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel>();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username: "string",
          avatar: "string",
        },
      },
    ]);
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username,
          avatar,
        },
      },
    });
    await saveMessage(message, chatRoomId);
    setMessage("");
  };
  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.payload]);
      })
      .subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);
  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {messages.map((message) => (
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
          <div
            className={`flex flex-col gap-1 ${message.userId === userId ? "items-end" : null
              }`}
          >
            <span
              className={`${message.userId === userId ? "bg-neutral-600" : "bg-blue-600"
                } p-2.5 rounded-md`}
            >
              {message.payload}
            </span>
            <span className="text-xs">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}
      <form className="flex relative" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent rounded-md w-full h-10 focus:outline-none px-5 ring-2 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
        ></input>
      </form>
    </div>
  );
}
