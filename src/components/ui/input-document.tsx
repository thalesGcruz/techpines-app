"use client";

import { InputHTMLAttributes, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputDocumentProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export function InputDocument({
  label,
  error,
  registration,
  ...props
}: InputDocumentProps) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value.replace(/\D/g, "").slice(0, 14);

    // CPF: 000.000.000-00
    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, a, b, c, d) =>
        d ? `${a}.${b}.${c}-${d}` : `${a}.${b}.${c}`
      );
    } 
    // CNPJ: 00.000.000/0000-00
    else {
      v = v.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
        (_, a, b, c, d, e) => `${a}.${b}.${c}/${d}${e ? "-" + e : ""}`
      );
    }

    setValue(v);
    e.target.value = v;
    registration.onChange(e); // sincroniza com RHF
  }

  return (
    <div className="mb-3 w-full">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...registration}
        {...props}
        value={value}
        onChange={handleChange}
        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
