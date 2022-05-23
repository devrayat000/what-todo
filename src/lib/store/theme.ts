import {
  action,
  Action,
  unstable_effectOn,
  Unstable_EffectOn,
} from "easy-peasy";

type ThemeMode = "dark" | "light";

export interface ThemeModel {
  mode: ThemeMode;
  toggleTheme: Action<this>;
  setTheme: Action<this, ThemeMode>;
  onModeChange: Unstable_EffectOn<this>;
}

export const themeModel: ThemeModel = {
  mode: "light",
  toggleTheme: action((state) => {
    state.mode = state.mode === "light" ? "dark" : "light";
  }),
  setTheme: action((state, newTheme) => {
    state.mode = newTheme;
  }),
  onModeChange: unstable_effectOn(
    [(state) => state.mode],
    (actions, change) => {
      const mode = change.current[0];

      if (mode === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
        document.body.removeAttribute("class");
      }
      return undefined;
    }
  ),
};
