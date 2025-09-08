import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import TiaoCarreiroPardinho from "./../../public/tiao-carreiro-pardinho.png";
import FormSuggestSong from "@/components/form-suggest-song";
import MusicsList from "@/components/musics-list";
import { Trophy } from 'lucide-react';
import LoginButton from "@/components/login-button";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-gray-800 overflow-y-auto pb-30">
      <header className="w-full  py-5 ">
        <div className="relative max-w-3xl m-auto flex gap-10 items-center inset-0 bg-[url('/background.jpg')] p-5 rounded-lg">
          <div className="absolute bg-black/70 backdrop-blur-xs w-full h-full -m-5 rounded-lg" />
          <div className="absolute z-50 top-2 right-3">
            <LoginButton />
          </div>
          <Avatar className="w-50 h-50 border-2">
            <Image
              alt="Tião Carreiro & Pardinho"
              src={TiaoCarreiroPardinho}
              className="rounded-full object-cover"
            />
          </Avatar>
          <div className="relative text-white font-bold w-full">
            <div>
              <h2 className="text-3xl">Tião Carreiro & Pardinho</h2>
              <span>Top 5 Música Mais Tocadas</span>
            </div>
          </div>
        </div>
      </header>
      <section className="w-full relative p-10 text-white max-w-3xl m-auto  bg-gray-900 shadow rounded-lg mb-3">
        <h2 className="text-xl mb-3">Sugerir Nova Música</h2>
        <FormSuggestSong />
      </section>
      <section className="w-full relative p-10 text-white max-w-3xl m-auto  bg-gray-900 shadow rounded-lg mb-3">
        <div className="flex gap-2 items-center mb-3">
          <Trophy color="orange" size={18}/>
          <h2 className="text-xl">Ranking Atual</h2>
        </div>
        <MusicsList type="ranking"/>
      </section>
    </main>
  );
}
