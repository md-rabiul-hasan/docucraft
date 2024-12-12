import ContentDisplay from "@/components/ContentDisplay";

export default function ContentPge({params: {contentId}}) {
  return (
    <ContentDisplay id={contentId} />
  )
}
