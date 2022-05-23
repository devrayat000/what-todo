import Todo from "$lib/utils/todo";
import { action, Action, computed, Computed } from "easy-peasy";
import { StoreModel } from ".";

export const enum FilterState {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}

export interface TodoModel {
  items: Todo[];
  filterState: FilterState;
  remaining: Computed<this, Todo[], StoreModel>;
  createTodo: Action<this, { text: string; desc: string; done?: boolean }>;
  completeTodo: Action<this, string>;
  deleteTodo: Action<this, string>;
  deleteCompleted: Action<this>;
  reorderTodos: Action<this, Todo[]>;
  // Filter
  filter: Action<this, FilterState>;
  filteredItems: Computed<this, Todo[], StoreModel>;
}

const fakeTodos = [
  new Todo("Todo 1"),
  new Todo("Todo 2"),
  new Todo("Todo 3"),
  new Todo("Todo 4"),
];

export const todoModel: TodoModel = {
  items: !import.meta.env.PROD ? fakeTodos : [],
  filterState: FilterState.ALL,
  remaining: computed([(state) => state.items], (todos) => {
    return todos.filter((item) => !item.done);
  }),
  createTodo: action((state, { text, desc, done = false }) => {
    state.items.push(new Todo(text, done));
  }),
  completeTodo: action((state, id) => {
    state.items = state.items.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });
  }),
  deleteTodo: action((state, id) => {
    state.items = state.items.filter((item) => item._id !== id);
  }),
  deleteCompleted: action((state) => {
    state.items = state.items.filter((item) => !item.done);
  }),
  reorderTodos: action((state, newState) => {
    state.items = newState;
  }),
  filter: action((state, payload) => {
    state.filterState = payload;
  }),
  filteredItems: computed(
    [(state) => state.filterState, (state) => state.items],
    (filterState, todos) => {
      switch (filterState) {
        case FilterState.ALL:
          return todos;
        case FilterState.ACTIVE:
          return todos.filter((todo) => !todo.done);
        case FilterState.COMPLETED:
          return todos.filter((todo) => todo.done);
        default:
          return todos;
      }
    }
  ),
};
