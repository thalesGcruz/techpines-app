import { Header } from "@/components/header"

export default function Layout({ children }: { children: React.ReactNode }){
    return (
      <main className="w-full h-screen  bg-gray-800 overflow-y-auto ">
        <div className="w-full p-2 px-15 h-full pb-30">
          <Header />
          {children}
        </div>
      </main>
  )
}