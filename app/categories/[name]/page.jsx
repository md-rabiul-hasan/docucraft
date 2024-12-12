import ContentDisplay from '@/components/ContentDisplay';
import { getDocuments } from '@/lib/doc';
import { getDocumentByCategory } from '@/utils/doc-util';

export default function CategoryPage({ params: {name}}) {
    const docs = getDocuments();
    const matchedDocs = getDocumentByCategory(docs, name);
    return (
        <ContentDisplay id={matchedDocs[0].id} />
    )
}
