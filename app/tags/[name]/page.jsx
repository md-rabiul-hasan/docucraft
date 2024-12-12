import ContentDisplay from '@/components/ContentDisplay';
import { getDocuments } from '@/lib/doc';
import { getDocumentByTag } from '@/utils/doc-util';

export default function TagPage({params: {name}}) {
    const docs = getDocuments();
    const matchedDocs = getDocumentByTag(docs, name);
    console.log(matchedDocs, name);
    return (
        <ContentDisplay id={matchedDocs[0].id} />
    )
}
