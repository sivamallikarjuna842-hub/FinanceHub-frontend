import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    currency: string;
    timezone: string;
  };
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const res = await api.post('/auth/register', data);
  return res.data;
}

export async function login(data: LoginData): Promise<AuthResponse> {
  const res = await api.post('/auth/login', data);
  return res.data;
}

export async function getProfile() {
  const res = await api.get('/auth/profile');
  return res.data;
}

export function setAuth(token: string, user: AuthResponse['user']) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getStoredUser(): AuthResponse['user'] | null {
  const stored = localStorage.getItem('user');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  return localStorage.getItem('token');
}

export function isAuthenticated(): boolean {
  return !!getStoredToken();
}