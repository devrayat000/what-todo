import AddTodo from "$lib/components/add-todo/AddTodo";
import Header from "$lib/components/common/header";
import FilterTodos from "$lib/components/filter";
import Todos from "$lib/components/todo";

function App() {
  return (
    <div className="h-screen bg-light-gray dark:bg-dark-blue">
      <div className="prose max-w-none prose-img:my-0 px-6 pt-12 pb-24 bg-[url('/images/bg-mobile-light.jpg')] dark:bg-[url('/images/bg-mobile-dark.jpg')] md:bg-[url('/images/bg-desktop-light.jpg')] dark:md:bg-[url('/images/bg-desktop-light.jpg')] bg-cover">
        <div className="max-w-md mx-auto">
          <Header />
          <main className="relative isolate z-10">
            <div className="absolute top-5 left-0 w-full">
              <AddTodo />

              <Todos />

              <FilterTodos className="md:hidden py-2.5 px-4" />

              <p className="text-center text-sm mt-10 text-light-dark-grayish-blue">
                Drag and drop to reorder list
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
