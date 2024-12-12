'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getDocumentByAuthor, getDocumentByCategory, getDocumentByTag } from '@/utils/doc-util';

export default function Sidebar({ docs = [] }) {
  const pathName = usePathname();
  const [rootNodes, setRootNodes] = useState([]);
  const [nonRootNodesGrouped, setNonRootNodesGrouped] = useState({});

  useEffect(() => {
    if (!docs || docs.length === 0) return;

    let filteredDocs = [...docs]; // Create a copy of docs to avoid mutating props

    // Filter documents based on path (tag, author, or category)
    if (pathName.includes('/tags')) {
      const tag = pathName.split('/')[2];
      filteredDocs = getDocumentByTag(filteredDocs, tag);
    } else if (pathName.includes('/authors')) {
      const author = pathName.split('/')[2];
      filteredDocs = getDocumentByAuthor(filteredDocs, author);
    } else if (pathName.includes('/categories')) {
      const category = pathName.split('/')[2];
      filteredDocs = getDocumentByCategory(filteredDocs, category);
    }

    // Get root nodes (documents without parent)
    const roots = filteredDocs.filter((doc) => !doc.parent);

    // Group non-root nodes by their parent ID
    const groupBy = (array, key) =>
      array.reduce((result, item) => {
        (result[item[key]] = result[item[key]] || []).push(item);
        return result;
      }, {});

    const nonRoots = groupBy(filteredDocs.filter((doc) => doc.parent), 'parent');

    // Ensure that root nodes also contain their direct children
    const nonRootsKeys = Reflect.ownKeys(nonRoots);
    nonRootsKeys.forEach((key) => {
      const foundInRoots = roots.find((root) => root.id === key);
      if (!foundInRoots) {
        const foundInDocs = filteredDocs.find((doc) => doc.id === key);
        roots.push(foundInDocs);
      }
    });

    // Sort root nodes by 'order' (if available)
    roots.sort((a, b) => a.order - b.order);

    // Update state
    setRootNodes(roots);
    setNonRootNodesGrouped(nonRoots);
  }, [pathName, docs]); // Run when docs or pathName changes

  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul role="list" className="border-l border-transparent">
        {rootNodes.map((rootNode) => (
          <li key={rootNode.id} className="relative">
            {/* Root Node Link */}
            <Link
              href={`/docs/${rootNode.id}`}
              className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
              aria-current="page"
            >
              <span className="truncate">{rootNode.title}</span>
            </Link>

            {/* Child Links */}
            {nonRootNodesGrouped[rootNode.id] && (
              <ul role="list" className="pl-4 border-l border-gray-200 dark:border-gray-700">
                {nonRootNodesGrouped[rootNode.id].map((subRoot) => (
                  <li key={subRoot.id}>
                    <Link
                      href={`/docs/${rootNode.id}/${subRoot.id}`}
                      className={`flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white ${
                        pathName === `/docs/${rootNode.id}/${subRoot.id}` ? 'font-bold' : ''
                      }`}
                      aria-current={pathName === `/docs/${rootNode.id}/${subRoot.id}` ? 'page' : undefined}
                    >
                      <span className="truncate">{subRoot.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
