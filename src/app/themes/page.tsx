import { ReaderEmptyState } from "@/components/reader/reader-empty-state";
import { ReaderView } from "@/components/reader/reader-view";
import { getReaderData } from "@/lib/content/repository";

export default async function ThemesPage() {
  const { themes, error } = await getReaderData();

  if (error || themes.length === 0) {
    return <ReaderEmptyState error={error} />;
  }

  return <ReaderView themes={themes} mode="all" />;
}
