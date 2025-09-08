import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"
import MusicsList from "@/components/musics-list"
import FormCreatetSong from "@/components/form-create.song"

export default function Home(){
    return(
        <Tabs defaultValue="musicas" className="max-w-3xl m-auto pb-10">
            <TabsList className="w-full bg-gray-900 h-10">
                <TabsTrigger value="musicas" className="text-white data-[state=active]:bg-orange-600">Músicas</TabsTrigger>
                <TabsTrigger value="sugestoes" className="text-white data-[state=active]:bg-orange-600">Sugestões</TabsTrigger>
            </TabsList>
            <TabsContent value="musicas" className="text-white">
                <div className="flex flex-col gap-2 border-b pb-5 border-b-gray-900 mb-3">
                    <h2>Adicine uma nova música</h2>
                    <FormCreatetSong />
                </div>
                <MusicsList type="musicas"/>
            </TabsContent>
            <TabsContent value="sugestoes" className="text-white">
                <MusicsList type="sugestoes"/>
            </TabsContent>
        </Tabs>
    )
}