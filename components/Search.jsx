import Image from 'next/image';

export default function Search() {
  return (
    <div className="relative hidden lg:block lg:max-w-md lg:flex-auto">
      <button
        type="button"
        className="focus:[&:not(:focus-visible)]:outline-none hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
      >
        <Image 
          src="/search.svg" 
          alt="Search Icon" 
          className="h-5 w-5" 
          width={20} 
          height={20} 
        />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent focus:border-none focus:outline-none"
        />
        <kbd className="ml-auto w-auto text-2xs text-zinc-400 dark:text-zinc-500">
          <span className="font-sans">Ctrl</span> + <span className="font-sans">K</span>
        </kbd>
      </button>
      {/* <SearchResult /> */}
    </div>
  );
}
