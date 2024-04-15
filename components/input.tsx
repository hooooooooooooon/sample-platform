import {
  LockClosedIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
}

export default function Input({
  name,
  placeholder,
  required,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative mb-8">
        <input
          required={required}
          name={name}
          className="peer/input relative w-full border-0 border-b-[1px] border-b-neutral-400 bg-none pb-2 text-base text-neutral-800 placeholder:text-transparent focus:outline-none"
          {...rest}
        />
        <label
          htmlFor={name}
          className="pointer-events-none absolute bottom-2 left-2 z-0 text-base capitalize text-neutral-400 transition-all duration-300 peer-valid/input:bottom-11 peer-valid/input:text-xs peer-valid/input:font-bold peer-focus/input:bottom-11 peer-focus/input:text-xs peer-focus/input:font-bold peer-focus/input:text-[#002366]"
        >
          {placeholder}
        </label>
        <span className="absolute bottom-0 left-0 block h-0.5 w-0 rounded-sm bg-[#120A8F] duration-300 peer-focus/input:w-full"></span>
        <div className="absolute right-0 bottom-3">
          {["email", "username"].includes(name) ? (
            <UserCircleIcon className="w-5 h-5 text-neutral-400" />
          ) : ["password", "passwordConfirm"].includes(name) ? (
            <LockClosedIcon className="w-5 h-5 text-neutral-400" />
          ) : (
            <PencilIcon className="w-4 h-4 text-neutral-400" />
          )}
        </div>
        {errors.map((error, index) => (
          <span
            key={index}
            className="absolute text-xs left-0 -bottom-5 text-red-500 font-medium"
          >
            {errors[0]}
          </span>
        ))}
      </div>
    </div>
  );
}
