function App() {
  return (
    <div className="prose max-w-none prose-img:my-0 px-6 pt-12 pb-24 bg-[url('/images/bg-mobile-light.jpg')] bg-cover">
      <div>
        <header className="relative flex justify-between items-center">
          <h1 className="uppercase font-normal text-3xl my-0 tracking-more-wide text-white">
            Todo
          </h1>
          <button type="button">
            <img src="/images/icon-moon.svg" alt="Theme Mode" />
          </button>
        </header>
        <main className="relative">
          <div className="absolute top-8 left-0 w-full">
            <form className="rounded-md bg-white py-2 px-4 shadow-md flex items-center gap-3">
              <input type="checkbox" name="done" id="done" />
              <input
                type="text"
                name="todo"
                id="todo"
                className="flex-1 focus:outline-none"
                placeholder="Create a new todo..."
              />
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
