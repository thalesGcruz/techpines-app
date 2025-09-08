'use client'

import { useMusicsStore } from "@/store/musics-store"
import { useEffect } from "react";
import Pagination from "./ranking-paginate";
import Image from "next/image";
import { ChevronsRight } from 'lucide-react';
import { formatViewsShort } from "@/lib/format";
import classNames from "classnames";
import { Button,  } from "./ui/button";
import { Trash2, CircleX, CircleCheckBig  } from 'lucide-react';
import MusicSkeleton from "./music-skeleton";

interface Props {
  type: "musicas" | "ranking" | "sugestoes";
}

export default function MusicsList({ type }: Props) {
  
  const { 
    fetchMusics, 
    musics, 
    setFilters, 
    page, 
    total,
    removeMusic,
    removeToList,
    updateMusic,
    loading
  } = useMusicsStore()  
 
  useEffect(() => {
      const status = type ==  "sugestoes" ? "awaiting_approval" : "active"
      setFilters({ status: status })
      fetchMusics(1, 5);
  }, [type, fetchMusics, setFilters]);


  return (
    <div className="flex flex-col gap-2">
      {loading && <MusicSkeleton />}

      {!loading && musics.length == 0 && (
        <div className="p-10 flex justify-center items-center text-gray-400">
          <span>"Ops! Nada por aqui ainda, que tal adicionar algo?</span>
        </div>
      )}

      {!loading && musics.length > 0 && musics.map((music, key) => (
        <div 
          key={music.id}
          className="w-full grid grid-cols-8 bg-gray-900 p-3 rounded-lg border border-gray-950 shadow gap-2"
        >
          <div
            className={classNames(
              "flex items-center justify-center font-bold text-xl",
              {
                "col-span-1 col-start-1": type === "ranking",  
                "col-span-1 order-8": type !== "ranking",
              }
            )}
          >
            {type == "ranking" &&  (page - 1) * 5 + (key + 1)}
            {type == "musicas" &&  (
              <Button 
                onClick={() => removeMusic(Number(music.id))}
                className="bg-gray-900 border cursor-pointer">
                <Trash2 />
              </Button>
            )}
            {type == "sugestoes" &&  (
              <div className="flex flex-col gap-2 text-xs">
                <Button 
                onClick={() => {
                  updateMusic(Number(music.id), { status: "active" })
                  removeToList(Number(music.id))
                }
                }
                className="bg-gray-900 border cursor-pointer border-green-200 text-green-200">
                  <span>Aprovar</span> <CircleCheckBig />
                </Button>
                <Button 
                onClick={() => {
                  updateMusic(Number(music.id), { status: "reproved" })
                  removeToList(Number(music.id))
                }}
                className="bg-gray-900 border cursor-pointer border-rose-300 text-rose-300">
                  <span>Reprovar</span><CircleX />
                </Button>
              </div>
            )}
          </div>
          <div className="col-span-5">
            <p className="text-lg">{music.title}</p>
            <span className="text-xs text-gray-400">
              {formatViewsShort(music.views)} visualizações
            </span>
          </div>
          <div className="col-span-2 flex justify-center">
            <Image 
              className="cover"
              src={music.thumb || ""}
              alt={music.title}
              width={100}
              height={100}
            /> 
          </div>
        </div>
      ))}

      {total > 5 && 
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-2 items-center">
            <span>6° Em Diante</span>
            <ChevronsRight size="18"/>
          </div>
          <Pagination />
        </div>
      } 
    </div>
  )
}
