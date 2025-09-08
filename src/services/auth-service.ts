
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    token_type: "Bearer";
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(errorData.message || "Erro ao fazer login");
    }

    const json = await response.json();
    return json.data as AuthResponse;
  },

  async logout(token: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(errorData.message || "Erro ao fazer logout");
    }
  },
};
