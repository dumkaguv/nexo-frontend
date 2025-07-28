import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  applyTheme: (theme?: Theme) => void;
};

const storageKey = "vite-ui-theme";

export const useThemeStore = create<ThemeStore>((set) => ({
  theme:
    (localStorage.getItem(storageKey) as Theme) ??
    (window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),

  setTheme: (theme) => {
    localStorage.setItem(storageKey, theme);
    document.documentElement.classList.remove("light", "dark");
    const appliedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    document.documentElement.classList.add(appliedTheme);

    set({ theme });
  },

  applyTheme: (theme) => {
    const current =
      theme ?? (localStorage.getItem(storageKey) as Theme) ?? "system";

    const appliedTheme =
      current === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : current;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(appliedTheme);

    set({ theme: current });
  },
}));
