export function getDocumentByCategory(docs, category){
    return docs.filter(doc => doc.category === category);
}

export function getDocumentByAuthor(docs, author){
    return docs.filter(doc => encodeURI(doc.author) === author);
}

export function getDocumentByTag(docs, tag) {
    console.log(docs);
    return docs.filter(doc => Array.isArray(doc.tag) && doc.tag.includes(tag));
  }