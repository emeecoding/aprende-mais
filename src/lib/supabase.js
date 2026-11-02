import { createClient } from "@supabase/supabase-js";

const REMEMBER_KEY = "aprende-remember-me";

/**
 * Guarda a sessão em lugares diferentes conforme o "Lembrar de mim":
 * - marcado:    localStorage   (continua logado mesmo fechando o navegador)
 * - desmarcado: sessionStorage (sai ao fechar a aba/navegador)
 */
const storage = {
  getItem: (key) => localStorage.getItem(key) ?? sessionStorage.getItem(key),

  setItem: (key, value) => {
    if (localStorage.getItem(REMEMBER_KEY) === "false") {
      sessionStorage.setItem(key, value);
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
      sessionStorage.removeItem(key);
    }
  },

  removeItem: (key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};

// Chame antes de fazer o login, com o valor da caixa "Lembrar de mim"
export function setRememberMe(remember) {
  localStorage.setItem(REMEMBER_KEY, String(remember));
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  { auth: { storage } },
);
