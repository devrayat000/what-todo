import { createStore, createTypedHooks, persist } from "easy-peasy";
import { themeModel, type ThemeModel } from "./theme";
import { todoModel, type TodoModel } from "./todo";

export interface StoreModel {
  todo: TodoModel;
  theme: ThemeModel;
}

export const storeModel: StoreModel = {
  todo: todoModel,
  theme: themeModel,
};

export const store = createStore(persist(storeModel), {
  // initialState: preloadedState,
  name: "todo-store",
  devTools: !import.meta.env.PROD,
});

export const {
  useStoreActions,
  useStore,
  useStoreState: useTodoStore,
} = createTypedHooks<StoreModel>();

export * from "./todo";
export * from "./theme";
