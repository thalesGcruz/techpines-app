"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export function InputText({ label, error, registration, ...props }: InputTextProps) {
  return (
    <div className="mb-3 w-full">
      <Label className="block mb-1 font-medium text-sm">{label}</Label>
      <input
        {...registration}
        {...props}
        className={`w-full border  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
