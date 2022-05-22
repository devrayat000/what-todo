import { action, Action } from "easy-peasy";

type ThemeMode = "dark" | "light";

export interface ThemeModel {
  mode: ThemeMode;
  toggleTheme: Action<this>;
  setTheme: Action<this, ThemeMode>;
}

export const themeModel: ThemeModel = {
  mode: "light",
  toggleTheme: action((state) => {
    state.mode = state.mode === "light" ? "dark" : "light";
  }),
  setTheme: action((state, newTheme) => {
    state.mode = newTheme;
  }),
};
