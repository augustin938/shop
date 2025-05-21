import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface AuthState {
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      isAuthenticated: false,
      error: null,
      
       login: async (email, password) => {
            try {
                const response = await axios.post('http://localhost:5000/api/login', {
                email: email.trim().toLowerCase(),
                password: password.trim()
                }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                // withCredentials: true // Раскомментируйте если используете куки
                });

                set({
                userId: response.data.userId,
                email: response.data.email,
                isAuthenticated: true,
                error: null
                });
            } catch (error: any) {
                console.error('Login error:', {
                request: error.config,
                response: error.response?.data
                });
                throw error;
            }
            },
      
      register: async (email, password) => {
        try {
          const response = await axios.post('http://localhost:5000/api/register', {
            email,
            password
          });
          
          console.log('Успешная регистрация:', response.data);
          
          set({
            userId: response.data.userId,
            email: response.data.email,
            isAuthenticated: true,
            error: null
          });
        } catch (error) {
          console.error('Ошибка регистрации:', error.response?.data);
          set({ error: error.response?.data?.message || 'Ошибка регистрации' });
          throw error;
        }
      },
      
      logout: () => {
        set({ 
          userId: null,
          email: null,
          isAuthenticated: false 
        });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);