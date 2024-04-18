"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { getUploadUrl, uploadSolution } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { solutionSchema, SolutionType } from "./schema";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SolutionType>({
    resolver: zodResolver(solutionSchema),
  });
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        "photo",
        `https://imagedelivery.net/cdvszbGqzHKygwWrlNkKRw/${id}`
      );
    }
  };
  const onSubmit = handleSubmit(async (data: SolutionType) => {
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }

    const formData = new FormData();
    formData.append("photo", data.photo);
    formData.append("title", data.title);
    formData.append("price", data.price + "");
    formData.append("description", data.description);
    return uploadSolution(formData);
  });
  const onValid = async () => {
    await onSubmit();
  };
  return (
    <div className="max-w-screen-sm mx-auto">
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex flex-col items-center justify-center text-neutral-200 border-neutral-200 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-red-400 text-sm font-semibold">
                {errors.photo?.message}
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <Input
          required
          placeholder="제목"
          type="text"
          {...register("title")}
          errors={[errors.title?.message ?? ""]}
        />
        <Input
          required
          placeholder="가격"
          type="number"
          {...register("price")}
          errors={[errors.price?.message ?? ""]}
        />
        <Input
          required
          placeholder="설명"
          type="text"
          {...register("description")}
          errors={[errors.description?.message ?? ""]}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
