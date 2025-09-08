import { getSession } from "next-auth/react";

export interface Music {
  id: number;
  title: string;
  views: number;
  youtube_id: string;
  thumb: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

async function getAuthHeaders() {
  const session = await getSession();
  const token = (session as any)?.accessToken;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

export const musicService = {
  async getAll(params?: { page?: number; perPage?: number; status?: string }) {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.status) query.append("status", String(params.status));
    if (params?.perPage) query.append("per_page", String(params.perPage));

    const response = await fetch(`${BASE_URL}/musics?${query.toString()}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(errorData.message || "Erro ao buscar músicas");
    }

    const json = await response.json();
    return json.data as PaginatedResponse<Music>;
  },

  
  async create(data: { url: string }) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/musics`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(errorData.message || "Erro ao criar música");
    }

    return (await response.json()).data as Music;
  },

  async update(id: number, data: Partial<Music>) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/musics/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(errorData.message || "Erro ao atualizar música");
    }

    return (await response.json()).data as Music;
  },

  async delete(id: number) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/musics/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(errorData.message || "Erro ao deletar música");
    }

    return { success: true };
  },

  async suggest(data: { url: string }) {
    const response = await fetch(`${BASE_URL}/suggest`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(errorData.message || "Erro ao sugerir música");
    }

    return (await response.json()).data as Music;
  },
};
