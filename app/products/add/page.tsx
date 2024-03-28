"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { uploadProduct } from "./actions";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  return (
    <div>
      <form action={uploadProduct} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-200 border-neutral-200 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-500 text-sm">
                사진을 추가해주세요.
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
        />
        <Input name="title" required placeholder="제목" type="text" />
        <Input name="price" required placeholder="가격" type="number" />
        <Input name="description" required placeholder="설명" type="text" />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
