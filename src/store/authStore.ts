import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios'; // Или fetch

type AuthState = {
  token: string | null;
  user: { email: string; name?: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};



export const useAuthStore = create<AuthState>()(
    
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Реальный запрос к API
          const response = await axios.post('https://api.your-backend.com/auth/login', {
            email,
            password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          set({
            token: response.data.accessToken, // или response.data.token
            user: {
              email: response.data.user.email,
              name: response.data.user.name // если есть
            },
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          let errorMessage = 'Ошибка авторизации';
          
          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
          }
          
          set({
            error: errorMessage,
            isLoading: false
          });
          throw new Error(errorMessage); // Пробрасываем ошибку для компонента
        }
      },
      
      logout: () => {
        // Опционально: запрос на сервер для инвалидации токена
        set({ 
          token: null, 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
      // Опционально: исключаем isLoading и error из сохранения
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);