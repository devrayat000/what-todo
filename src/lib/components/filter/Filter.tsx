import { FilterState } from "$lib/store";
import clsx from "clsx";
import FilterButton from "./filter-button";
import { FilterContext } from "./filter-context";

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  state: FilterState;
  setState: (newState: FilterState) => void;
}

const Filter = function ({
  className,
  state,
  setState,
  ...props
}: FilterProps) {
  const cls = clsx(
    "z-20 mt-3 text-sm bg-white dark:bg-dark-desaturated-blue text-light-dark-grayish-blue font-bold rounded-md overflow-hidden shadow-lg flex justify-center items-center gap-4",
    className
  );
  return (
    <footer className={cls} {...props}>
      <FilterContext.Provider value={{ state, setState }}>
        <FilterButton value={FilterState.ALL} activeClassName="text-primary">
          All
        </FilterButton>
        <FilterButton value={FilterState.ACTIVE} activeClassName="text-primary">
          Active
        </FilterButton>
        <FilterButton
          value={FilterState.COMPLETED}
          activeClassName="text-primary"
        >
          Completed
        </FilterButton>
      </FilterContext.Provider>
    </footer>
  );
};

export default Filter;
