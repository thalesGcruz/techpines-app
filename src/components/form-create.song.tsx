'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMusicsStore } from "@/store/musics-store";
import { SendHorizontal, Loader2 } from "lucide-react";

const schema = z.object({
  url: z
    .string()
    .min(2, "Este campo é obrigatorio!"),
});

type FormData = z.infer<typeof schema>;

interface SuggestSongFormProps {
  onSubmit?: (data: FormData) => Promise<void> | void;
}

export default function FormCreatetSong({ onSubmit }: SuggestSongFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { url: "" },
    mode: "onBlur",
  });

  const { createMusic } = useMusicsStore()

  async function submit(data: FormData) {
    createMusic(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex w-full  items-start gap-2"
      noValidate
    >
      <div className="flex-1">
        <label htmlFor="song" className="sr-only">
          Song name
        </label>
        <input
          id="song"
          type="text"
          {...register("url")}
          placeholder="Digite o Link da música..."
          aria-invalid={!!errors.url}
          aria-describedby={errors.url ? "url-error" : undefined}
          className={`h-12 w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            errors.url
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-indigo-400"
          }`}
        />
        {errors.url && (
          <p id="url-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.url.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex gap-2 h-12 items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ?  <Loader2 className="animate-spin w-5 h-5" /> : <SendHorizontal size={18}/>}
        
      </button>
    </form>
  );
}
