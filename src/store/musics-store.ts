import { create } from "zustand";
import {
  musicService,
  Music,
  PaginatedResponse,
} from "@/services/music-service";
import toast from "react-hot-toast";

interface MusicStore {
  musics: Music[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  filters: {
    status?: string;
  };
  setFilters: (filters: Partial<MusicStore["filters"]>) => void;
  setMusics: (musics: Music[]) => void;
  fetchMusics: (page?: number, limit?: number) => Promise<void>;
  reset: () => void;
  removeMusic: (id: number) => void;
  updateMusic: (id: number, music: Partial<Music>) => void;
  createMusic: (data: {url: string }) => void;
}

export const useMusicsStore = create<MusicStore>((set, get) => ({
  musics: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  filters: {},

  setFilters: (filters) => set({ filters }),

  setMusics: (musics) => set({ musics }),

  fetchMusics: async (page = get().page, limit = get().limit) => {
    set({ loading: true });

    try {
      const { filters } = get();
      const apiData: PaginatedResponse<Music> = await musicService.getAll({
        ...filters,
        page,
        perPage: limit,
      });

      set({
        musics: apiData.data,
        total: apiData.total,
        page: apiData.current_page,
        limit: apiData.per_page,
        loading: false,
      });
    } catch (err) {
      console.error("Erro ao buscar músicas:", err);
      set({ loading: false });
    }
  },

  createMusic: async (data: { url: string }) => {
    try {
      const newMusic = await musicService.create(data);
      set((state) => ({
        musics: [newMusic, ...state.musics],
      }));
      toast.success("Música criada com sucesso");
      await get().fetchMusics(1, get().limit);
    } catch (err) {
      toast.error("Erro ao criar música, adicione um link valido!");
    }
  },

  updateMusic: async (id: number, data: Partial<Music>) => {
    try {
      const updatedMusic = await musicService.update(id, data);
      set((state) => ({
        musics: state.musics.map((music) =>
          music.id === id ? updatedMusic : music
        ),
      }));
      toast.success("Música atualizada com sucesso");
    } catch (err) {
      toast.error("Erro ao atualizar música");
    }
  },

  removeMusic: async (id: number) => {
    try {
      await musicService.delete(id);
      set((state) => ({
        musics: state.musics.filter((music) => music.id !== id),
        total: state.total - 1,
      }));
      toast.success("Música removida com sucesso");
    } catch (err) {
      toast.error("Erro ao remover musica");
    }
  },

  reset: () => set({ musics: [], total: 0, page: 1, filters: {} }),
}));
