import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthUser } from '../types';

const AUTH_STORAGE_KEY = 'khmercode_quest_auth_v1';

const getInitialAuthState = (): AuthState => {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.user) {
        return {
          isAuthenticated: true,
          user: parsed.user,
          loading: false,
          error: null,
        };
      }
    }
  } catch {
    // Ignore storage parse errors
  }
  return {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialAuthState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      try {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ user: action.payload })
        );
      } catch {
        // Storage fail ignored
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch {
        // Storage fail ignored
      }
    },
    updateUserProfile: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        try {
          localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({ user: state.user })
          );
        } catch {
          // Storage fail ignored
        }
      }
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, logout, updateUserProfile, setAuthError, setAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;
