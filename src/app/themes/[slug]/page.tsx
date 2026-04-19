import { notFound } from "next/navigation";

import { ReaderEmptyState } from "@/components/reader/reader-empty-state";
import { ReaderView } from "@/components/reader/reader-view";
import { getSingleTheme } from "@/lib/content/repository";

export default async function SingleThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { themes, theme, error } = await getSingleTheme(slug);

  if (error || themes.length === 0) {
    return <ReaderEmptyState error={error} />;
  }

  if (!theme) {
    notFound();
  }

  return <ReaderView themes={themes} mode="single" selectedSlug={theme.slug} />;
}
