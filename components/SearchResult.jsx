import Link from 'next/link';

export default function SearchResult() {
  return (
    <div className="absolute left-0 top-12 z-[999] w-full rounded-md bg-white p-4 shadow">
      <p className="!text-lg">
        Showing results for
        <span className="font-semibold"> "keyword":</span>
      </p>
      <ul role="list" className="divide-y divide-gray-100 [&>*]:py-2">
        <li>
            <Link className="transition-all hover:text-emerald-600">
              How to create a new component in Vue.js
            </Link>
        </li>
        <li>
            <Link className="transition-all hover:text-emerald-600">
              How to create a new component in React.js
            </Link>
        </li>
        <li>
            <Link className="transition-all hover:text-emerald-600">
              Next.js Routing
            </Link>
        </li>
        <li>
            <Link className="transition-all hover:text-emerald-600">SSR - What is it?</Link>
        </li>
      </ul>
    </div>
  );
}
