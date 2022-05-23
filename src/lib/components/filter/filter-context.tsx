import { FilterState } from "$lib/store";
import { useContext, createContext } from "react";

interface IFilterContext {
  state: FilterState;
  setState(state: FilterState): void;
}

export const FilterContext = createContext<IFilterContext | null>(null);

export const useFilter = () => useContext(FilterContext)!;
