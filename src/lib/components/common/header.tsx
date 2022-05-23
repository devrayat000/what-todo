import { useStoreActions, useTodoStore } from "$lib/store";
import { AnimatePresence, m, type Variants } from "framer-motion";

const scale: Variants = {
  hidden: {
    opacity: 0.5,
    scale: 0.2,
  },
  show: {
    opacity: 1,
    scale: 0.8,
  },
};

export default function Header() {
  const toggleTheme = useStoreActions((store) => store.theme.toggleTheme);
  const themeMode = useTodoStore((store) => store.theme.mode);

  return (
    <header className="flex justify-between items-center">
      <h1 className="uppercase font-normal text-3xl my-0 tracking-more-wide text-white">
        Todo
      </h1>
      <m.button
        initial="hidden"
        animate="show"
        exit="hidden"
        type="button"
        onClick={() => toggleTheme()}
      >
        <AnimatePresence key={themeMode} exitBeforeEnter>
          {themeMode === "light" ? (
            <m.img
              variants={scale}
              key="light"
              src="/images/icon-moon.svg"
              alt="Theme Mode"
            />
          ) : (
            <m.img
              variants={scale}
              key="dark"
              src="/images/icon-sun.svg"
              alt="Theme Mode"
            />
          )}
        </AnimatePresence>
      </m.button>
    </header>
  );
}
