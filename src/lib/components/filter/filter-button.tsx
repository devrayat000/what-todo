import { type FilterState } from "$lib/store";
import clsx from "clsx";
import { useFilter } from "./filter-context";

interface FilterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: FilterState;
  activeClassName?: string;
}

const FilterButton = ({
  value,
  className,
  activeClassName,
  ...props
}: FilterButtonProps) => {
  const { state, setState } = useFilter();

  const cls = clsx(
    "font-bold text-light-dark-grayish-blue hover:text-light-very-dark-grayish-blue transition-colors",
    className,
    state === value && activeClassName,
    {
      ["text-primary"]: state === value,
    }
  );

  return (
    <button
      onClick={() => setState(value)}
      type="button"
      className={cls}
      {...props}
    />
  );
};

export default FilterButton;
