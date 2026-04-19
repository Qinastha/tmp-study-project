"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  List,
  MessageSquare,
  PanelLeft,
} from "lucide-react";

import { CommentPanel, type CommentTarget } from "@/components/reader/comment-panel";
import { InlineComments } from "@/components/reader/inline-comments";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AbbreviatedText } from "@/components/reader/abbreviated-text";
import {
  type AbbreviationDefinition,
  extractAbbreviations,
} from "@/lib/content/abbreviations";
import { createClient } from "@/lib/supabase/client";
import type { ReaderTheme } from "@/lib/content/repository";
import type { CommentRow, ContentBlockRow } from "@/types/database";
import { cn } from "@/lib/utils";

interface ReaderViewProps {
  themes: ReaderTheme[];
  mode: "all" | "single";
  selectedSlug?: string;
}

export function ReaderView({ themes, mode, selectedSlug }: ReaderViewProps) {
  const [comments, setComments] = useState<CommentRow[]>(() => themes.flatMap((theme) => theme.comments));
  const [target, setTarget] = useState<CommentTarget | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const selectedTheme = themes.find((theme) => theme.slug === selectedSlug) ?? themes[0];
  const selectedIndex = themes.findIndex((theme) => theme.id === selectedTheme?.id);
  const visibleThemes = mode === "single" && selectedTheme ? [selectedTheme] : themes;
  const abbreviations = useMemo(() => extractAbbreviations(themes), [themes]);
  const totalBlocks = useMemo(
    () => themes.reduce((sum, theme) => sum + theme.blocks.length, 0),
    [themes],
  );

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("reader-comments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        (payload) => {
          setComments((current) => applyRealtimeComment(current, payload));
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  function openComments(nextTarget: CommentTarget) {
    setTarget(nextTarget);
    setPanelOpen(true);
  }

  return (
    <main className="min-h-svh bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-3 px-3 sm:px-5">
          <MobileThemeNav themes={themes} selectedSlug={selectedTheme?.slug} />
          <div className="min-w-0 flex-1">
            <Link href="/themes" className="flex w-fit items-center gap-2">
              <BookOpen className="size-4 text-primary" />
              <span className="truncate text-sm font-semibold">АИТ Study Reader</span>
            </Link>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            <Button variant={mode === "all" ? "secondary" : "ghost"} size="sm" asChild>
              <Link href="/themes">Все темы</Link>
            </Button>
            <Button variant={mode === "single" ? "secondary" : "ghost"} size="sm" asChild>
              <Link href={`/themes/${selectedTheme?.slug ?? themes[0]?.slug}`}>Одна тема</Link>
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] border-r md:block">
          <ThemeNav themes={themes} selectedSlug={selectedTheme?.slug} />
        </aside>

        <div className="min-w-0 px-4 py-6 [overflow-wrap:anywhere] sm:px-8 lg:px-12">
          <section className="mb-8 flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{themes.length} тем</Badge>
                <Badge variant="outline">{totalBlocks} блоков</Badge>
                <Badge variant="outline">{comments.length} комментариев</Badge>
              </div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {mode === "single" ? selectedTheme?.title : "Все темы"}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Режим чтения синхронизирован с общими комментариями: заметка к абзацу или теме
                остается видимой в обоих режимах.
              </p>
            </div>

            {mode === "single" && selectedTheme ? (
              <div className="flex gap-2">
                {selectedIndex > 0 ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/themes/${themes[selectedIndex - 1]?.slug}`}>
                      <ChevronLeft className="size-4" />
                      Назад
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="size-4" />
                    Назад
                  </Button>
                )}
                {selectedIndex < themes.length - 1 ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/themes/${themes[selectedIndex + 1]?.slug}`}>
                      Далее
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Далее
                    <ChevronRight className="size-4" />
                  </Button>
                )}
              </div>
            ) : null}
          </section>

          <div className="mx-auto max-w-4xl space-y-14">
            {visibleThemes.map((theme) => (
              <ThemeArticle
                key={theme.id}
                theme={theme}
                comments={comments.filter((comment) => comment.theme_id === theme.id)}
                abbreviations={abbreviations}
                onOpenComments={openComments}
              />
            ))}
          </div>
        </div>
      </div>

      <CommentPanel
        open={panelOpen}
        isDesktop={isDesktop}
        target={target}
        comments={target ? commentsForTarget(comments, target) : []}
        onOpenChange={setPanelOpen}
      />
    </main>
  );
}

function ThemeArticle({
  theme,
  comments,
  abbreviations,
  onOpenComments,
}: {
  theme: ReaderTheme;
  comments: CommentRow[];
  abbreviations: AbbreviationDefinition[];
  onOpenComments: (target: CommentTarget) => void;
}) {
  const themeCommentCount = commentsForTarget(comments, {
    targetType: "theme",
    themeId: theme.id,
    contentBlockId: null,
    title: theme.title,
    subtitle: "Тема целиком",
  }).length;
  const themeCommentTarget: CommentTarget = {
    targetType: "theme",
    themeId: theme.id,
    contentBlockId: null,
    title: theme.title,
    subtitle: "Комментарии к теме целиком",
  };

  return (
    <article id={theme.slug} className="scroll-mt-24">
      <header className="mb-6 flex items-start justify-between gap-4 border-b pb-4">
        <div className="min-w-0 space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Тема {theme.sort_order}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{theme.title}</h2>
        </div>
        <CommentButton
          count={themeCommentCount}
          label="Комментарии к теме"
          onClick={() => onOpenComments(themeCommentTarget)}
        />
      </header>

      <div className="mb-4 lg:ml-auto lg:max-w-[220px]">
        <InlineComments
          comments={commentsForTarget(comments, themeCommentTarget)}
          onShowAll={() => onOpenComments(themeCommentTarget)}
        />
      </div>

      <div className="space-y-2">
        {theme.blocks.map((block) => (
          <ContentBlock
            key={block.id}
            block={block}
            theme={theme}
            comments={comments}
            abbreviations={abbreviations}
            onOpenComments={onOpenComments}
          />
        ))}
      </div>
    </article>
  );
}

function ContentBlock({
  block,
  theme,
  comments,
  abbreviations,
  onOpenComments,
}: {
  block: ContentBlockRow;
  theme: ReaderTheme;
  comments: CommentRow[];
  abbreviations: AbbreviationDefinition[];
  onOpenComments: (target: CommentTarget) => void;
}) {
  const count = commentsForTarget(comments, {
    targetType: "block",
    themeId: theme.id,
    contentBlockId: block.id,
    title: block.text,
    subtitle: theme.title,
  }).length;
  const target: CommentTarget = {
    targetType: "block",
    themeId: theme.id,
    contentBlockId: block.id,
    title: block.kind === "heading" ? block.text : "Комментарий к абзацу",
    subtitle: theme.title,
  };

  return (
    <div id={block.block_key} className="group scroll-mt-24 rounded-lg px-2 py-2 transition-colors hover:bg-muted/45">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(168px,220px)]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
          <BlockText
            block={block}
            abbreviations={theme.theme_key === "abbreviations" ? [] : abbreviations}
          />
          <div className="pt-0.5 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
            <CommentButton count={count} label="Комментарии к блоку" onClick={() => onOpenComments(target)} />
          </div>
        </div>
        <InlineComments
          comments={commentsForTarget(comments, target)}
          onShowAll={() => onOpenComments(target)}
        />
      </div>
    </div>
  );
}

function BlockText({
  block,
  abbreviations,
}: {
  block: ContentBlockRow;
  abbreviations: AbbreviationDefinition[];
}) {
  const content = <AbbreviatedText text={block.text} abbreviations={abbreviations} />;

  if (block.kind === "heading") {
    return <h3 className="mt-5 text-xl font-semibold tracking-tight text-primary">{content}</h3>;
  }

  if (block.kind === "bullet") {
    return (
      <p className="relative pl-5 text-[1.02rem] leading-8 text-foreground/90 before:absolute before:left-0 before:top-[0.82rem] before:size-1.5 before:rounded-full before:bg-primary/75">
        {content}
      </p>
    );
  }

  return <p className="text-[1.02rem] leading-8 text-foreground/90">{content}</p>;
}

function ThemeNav({ themes, selectedSlug }: { themes: ReaderTheme[]; selectedSlug?: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <PanelLeft className="size-4 text-primary" />
          Темы
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <nav className="space-y-1 p-3">
          {themes.map((theme) => (
            <Button
              key={theme.id}
              variant={selectedSlug === theme.slug ? "secondary" : "ghost"}
              size="sm"
              asChild
              className="h-auto w-full justify-start whitespace-normal px-3 py-2 text-left"
            >
              <Link href={`/themes/${theme.slug}`}>
                <span className="mr-2 text-xs text-muted-foreground">{theme.sort_order}</span>
                <span>{theme.title}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}

function MobileThemeNav({ themes, selectedSlug }: { themes: ReaderTheme[]; selectedSlug?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden" aria-label="Открыть список тем">
          <List className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(90vw,360px)] p-0">
        <SheetHeader className="border-b px-4 py-4 text-left">
          <SheetTitle>Темы</SheetTitle>
        </SheetHeader>
        <ThemeNav themes={themes} selectedSlug={selectedSlug} />
      </SheetContent>
    </Sheet>
  );
}

function CommentButton({
  count,
  label,
  onClick,
}: {
  count: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={count > 0 ? "secondary" : "ghost"}
          size="icon-sm"
          className={cn("relative shrink-0", count > 0 && "text-primary")}
          onClick={onClick}
          aria-label={label}
        >
          <MessageSquare className="size-4" />
          {count > 0 ? (
            <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          ) : null}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function commentsForTarget(comments: CommentRow[], target: CommentTarget) {
  return comments.filter((comment) => {
    if (target.targetType === "theme") {
      return comment.theme_id === target.themeId && comment.theme_content_block_id === null;
    }

    return comment.theme_content_block_id === target.contentBlockId;
  });
}

function applyRealtimeComment(current: CommentRow[], payload: { eventType: string; new: unknown; old: unknown }) {
  if (payload.eventType === "DELETE") {
    const oldComment = payload.old as Pick<CommentRow, "id">;
    return current.filter((comment) => comment.id !== oldComment.id);
  }

  const nextComment = payload.new as CommentRow;
  if (!nextComment?.id || nextComment.status !== "visible") {
    return current.filter((comment) => comment.id !== nextComment?.id);
  }

  const withoutExisting = current.filter((comment) => comment.id !== nextComment.id);
  return [...withoutExisting, nextComment].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isDesktop;
}
