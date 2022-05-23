import React from "react";

import { useStoreActions, useTodoStore } from "$lib/store";
import Filter from "./Filter";

const FilterTodos: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const filterState = useTodoStore((state) => state.todo.filterState);
  const setFilterState = useStoreActions((actions) => actions.todo.filter);

  return <Filter state={filterState} setState={setFilterState} {...props} />;
};

export default FilterTodos;
