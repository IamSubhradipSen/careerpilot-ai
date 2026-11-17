import apiClient from "../api/client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthResult {
  token: string;
  user: AuthUser;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthResult;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const authService = {
  async login(credentials: LoginData): Promise<AuthUser> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    const { token, user } = response.data.data;

    localStorage.setItem("accessToken", token);

    return user;
  },

  async register(userData: RegisterData): Promise<AuthUser> {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: AuthUser;
    }>("/auth/register", userData);

    return response.data.data;
  },

  logout(): void {
    localStorage.removeItem("accessToken");
  },
};

export default authService;