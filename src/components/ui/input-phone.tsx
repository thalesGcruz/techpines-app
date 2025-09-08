"use client";

import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export function InputPhone({ label, error, registration, ...props }: InputPhoneProps) {
  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11); // só números até 11 dígitos

    if (digits.length <= 10) {
      return digits.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, a, b, c) =>
        [a && `(${a}`, b && `) ${b}`, c && `-${c}`].filter(Boolean).join("")
      );
    }

    return digits.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, a, b, c) =>
      [a && `(${a}`, b && `) ${b}`, c && `-${c}`].filter(Boolean).join("")
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(e.target.value);
    e.target.value = formatted;
    registration.onChange(e);
  }

  return (
    <div className="mb-3 w-full">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...registration}
        {...props}
        onChange={handleChange}
        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
