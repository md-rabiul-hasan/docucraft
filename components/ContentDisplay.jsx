// Import necessary modules and components
import { getDocumentContent } from "@/lib/doc"; // Function to fetch document content
import Link from "next/link"; // Link component for navigation
import Tag from "./Tag"; // Tag component for displaying tags

/**
 * ContentDisplay Component
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the document to fetch.
 * @returns JSX Element displaying the document content.
 */
export default async function ContentDisplay({ id }) {
  // Fetch document content using the provided ID
  const documentContent = await getDocumentContent(id);

  // Log the fetched document content (for debugging purposes)
  console.log(documentContent);

  // Render the document content
  return (
    <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
      {/* Main content area */}
      <main className="flex-auto pb-16">
        <article className="prose dark:prose-invert">
          {/* Document Title */}
          <h1>{documentContent.title}</h1>

          {/* Metadata Section */}
          <div>
            <span>Published On: {documentContent.date}</span> by{" "}
            <Link href={`/authors/${documentContent.author}`}>
              {documentContent.author}
            </Link>{" "}
            under the{" "}
            <Link href={`/categories/${documentContent.category}`}>
              {documentContent.category}
            </Link>{" "}
            category.
          </div>

          {/* Tags Section */}
          <div>
            {documentContent.tags &&
              documentContent.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
          </div>

          {/* Document Content */}
          <div
            className="lead"
            dangerouslySetInnerHTML={{ __html: documentContent.contentHtml }} // Directly inject HTML content
          />
        </article>
      </main>
    </div>
  );
}
