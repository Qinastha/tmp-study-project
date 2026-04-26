"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
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
  SheetDescription,
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

const ALL_THEMES_READING_POSITION_KEY = "ait-study-reader:last-theme-slug";
const READER_SCROLL_OFFSET_PX = 96;

export function ReaderView({ themes, mode, selectedSlug }: ReaderViewProps) {
  const [comments, setComments] = useState<CommentRow[]>(() => themes.flatMap((theme) => theme.comments));
  const [target, setTarget] = useState<CommentTarget | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(() => selectedSlug ?? themes[0]?.slug ?? "");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const activeSlugRef = useRef(activeSlug);
  const restoredAllThemesPositionRef = useRef(false);
  const hasHydrated = useHasHydrated();
  const isDesktop = useIsDesktop();

  const selectedTheme = themes.find((theme) => theme.slug === selectedSlug) ?? themes[0];
  const activeTheme = mode === "all"
    ? themes.find((theme) => theme.slug === activeSlug) ?? themes[0]
    : selectedTheme;
  const activeIndex = Math.max(
    0,
    themes.findIndex((theme) => theme.id === activeTheme?.id),
  );
  const selectedIndex = themes.findIndex((theme) => theme.id === selectedTheme?.id);
  const visibleThemes = mode === "single" && selectedTheme ? [selectedTheme] : themes;
  const abbreviations = useMemo(() => extractAbbreviations(themes), [themes]);
  const totalBlocks = useMemo(
    () => themes.reduce((sum, theme) => sum + theme.blocks.length, 0),
    [themes],
  );

  const commitActiveTheme = useCallback(
    (slug: string) => {
      if (!slug) {
        return;
      }

      if (activeSlugRef.current === slug) {
        return;
      }

      activeSlugRef.current = slug;
      setActiveSlug(slug);
      if (mode === "all") {
        window.localStorage.setItem(ALL_THEMES_READING_POSITION_KEY, slug);
      }
    },
    [mode],
  );

  const scrollToTheme = useCallback(
    (slug: string, behavior: ScrollBehavior = "smooth") => {
      const targetElement = document.getElementById(slug);

      if (!targetElement) {
        return;
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      commitActiveTheme(slug);
      targetElement.scrollIntoView({
        behavior: reducedMotion ? "auto" : behavior,
        block: "start",
      });
    },
    [commitActiveTheme],
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

  useEffect(() => {
    if (mode !== "all" || restoredAllThemesPositionRef.current) {
      return;
    }

    restoredAllThemesPositionRef.current = true;

    const hashSlug = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    const storedSlug = window.localStorage.getItem(ALL_THEMES_READING_POSITION_KEY);
    const targetSlug = [hashSlug, storedSlug].find(
      (slug): slug is string => Boolean(slug && themes.some((theme) => theme.slug === slug)),
    );

    if (!targetSlug) {
      return;
    }

    const timeout = window.setTimeout(() => scrollToTheme(targetSlug, "auto"), 0);
    return () => window.clearTimeout(timeout);
  }, [mode, scrollToTheme, themes]);

  useEffect(() => {
    if (mode !== "all") {
      return;
    }

    let animationFrame = 0;

    function updateActiveThemeFromScroll() {
      animationFrame = 0;
      const nextSlug = findCurrentThemeSlug(themes);

      if (nextSlug) {
        commitActiveTheme(nextSlug);
      }
    }

    function scheduleUpdate() {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateActiveThemeFromScroll);
      }
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [commitActiveTheme, mode, themes]);

  function openComments(nextTarget: CommentTarget) {
    setTarget(nextTarget);
    setPanelOpen(true);
  }

  return (
    <main className="min-h-svh bg-background" data-reader-mode={mode}>
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 w-full items-center gap-3 px-3 sm:px-5">
          <MobileThemeNav
            themes={themes}
            mode={mode}
            selectedSlug={activeTheme?.slug}
            onSelectTheme={(slug) => scrollToTheme(slug)}
          />
          <div className="min-w-0 flex-1">
            <Link href="/themes" className="flex w-fit items-center gap-2">
              <BookOpen className="size-4 text-primary" />
              <span className="truncate text-sm font-semibold">АИТ Study Reader</span>
            </Link>
          </div>
          {mode === "single" ? (
            <Button variant="secondary" size="sm" className="md:hidden" asChild>
              <Link href="/themes" aria-label="Вернуться ко всем темам">
                <List className="size-3.5" />
                Все
              </Link>
            </Button>
          ) : null}
          <nav className="hidden items-center gap-1 md:flex">
            <Button variant={mode === "all" ? "secondary" : "ghost"} size="sm" asChild>
              <Link href="/themes">Все темы</Link>
            </Button>
            <Button variant={mode === "single" ? "secondary" : "ghost"} size="sm" asChild>
              <Link href={`/themes/${activeTheme?.slug ?? selectedTheme?.slug ?? themes[0]?.slug}`}>Одна тема</Link>
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <div
        className={cn(
          "grid w-full grid-cols-1 transition-[grid-template-columns] duration-300 ease-out md:grid-cols-[300px_minmax(0,1fr)]",
          sidebarCollapsed && "md:grid-cols-[96px_minmax(0,1fr)]",
        )}
      >
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] border-r md:block">
          <ThemeNav
            themes={themes}
            mode={mode}
            selectedSlug={activeTheme?.slug}
            collapsed={sidebarCollapsed}
            collapsible
            onCollapsedChange={setSidebarCollapsed}
            onSelectTheme={(slug) => scrollToTheme(slug)}
          />
        </aside>

        <div
          className={cn(
            "min-w-0 px-4 py-6 [overflow-wrap:anywhere] sm:px-8 lg:px-10 xl:px-12",
            mode === "all" && "pb-28",
          )}
        >
          <section className="mb-8 flex w-full max-w-[1280px] flex-col gap-4 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{themes.length} тем</Badge>
                <Badge variant="outline">{totalBlocks} блоков</Badge>
                <Badge variant="outline">{comments.length} комментариев</Badge>
              </div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {mode === "single" && selectedTheme ? (
                  <AbbreviatedText text={selectedTheme.title} abbreviations={abbreviations} />
                ) : (
                  "Все темы"
                )}
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

          <div className="w-full max-w-[1280px] space-y-14">
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

      {mode === "all" && activeTheme && hasHydrated ? (
        <AllThemesFloatingNav
          themes={themes}
          activeIndex={activeIndex}
          sidebarCollapsed={sidebarCollapsed}
          onSelectTheme={(slug) => scrollToTheme(slug)}
        />
      ) : null}

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
  const blockSegments = segmentContentBlocks(theme.blocks);

  return (
    <article
      id={theme.slug}
      data-reader-theme={theme.slug}
      className="scroll-mt-24 border-b pb-12 last:border-b-0"
    >
      <header className="mb-6 flex items-start justify-between gap-4 border-b pb-4">
        <div className="min-w-0 space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Тема {theme.sort_order}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            <AbbreviatedText
              text={theme.title}
              abbreviations={theme.theme_key === "abbreviations" ? [] : abbreviations}
            />
          </h2>
        </div>
        <CommentButton
          count={themeCommentCount}
          label="Комментарии к теме"
          onClick={() => onOpenComments(themeCommentTarget)}
        />
      </header>

      <div className="mb-4 lg:ml-auto lg:max-w-[260px]">
        <InlineComments
          comments={commentsForTarget(comments, themeCommentTarget)}
          onShowAll={() => onOpenComments(themeCommentTarget)}
        />
      </div>

      <div className="space-y-2">
        {blockSegments.map((segment) =>
          segment.type === "table" ? (
            <ContentTable
              key={segment.blocks.map((block) => block.id).join("-")}
              blocks={segment.blocks}
              theme={theme}
              comments={comments}
              abbreviations={abbreviations}
              onOpenComments={onOpenComments}
            />
          ) : (
            <ContentBlock
              key={segment.block.id}
              block={segment.block}
              theme={theme}
              comments={comments}
              abbreviations={abbreviations}
              onOpenComments={onOpenComments}
            />
          ),
        )}
      </div>
    </article>
  );
}

type ContentBlockSegment =
  | { type: "block"; block: ContentBlockRow }
  | { type: "table"; blocks: ContentBlockRow[] };

function segmentContentBlocks(blocks: ContentBlockRow[]): ContentBlockSegment[] {
  const segments: ContentBlockSegment[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];

    if (!isDelimitedTableBlock(block)) {
      segments.push({ type: "block", block });
      index += 1;
      continue;
    }

    const tableBlocks: ContentBlockRow[] = [];
    while (index < blocks.length && isDelimitedTableBlock(blocks[index])) {
      tableBlocks.push(blocks[index]);
      index += 1;
    }

    if (tableBlocks.length >= 2) {
      segments.push({ type: "table", blocks: tableBlocks });
    } else {
      segments.push(...tableBlocks.map((item) => ({ type: "block" as const, block: item })));
    }
  }

  return segments;
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
  const target = blockCommentTarget(block, theme);
  const count = commentsForTarget(comments, target).length;

  return (
    <div id={block.block_key} className="group scroll-mt-24 rounded-lg px-2 py-2 transition-colors hover:bg-muted/45">
      <div className="grid gap-3 xl:grid-cols-[minmax(0,820px)_minmax(190px,280px)]">
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

function ContentTable({
  blocks,
  theme,
  comments,
  abbreviations,
  onOpenComments,
}: {
  blocks: ContentBlockRow[];
  theme: ReaderTheme;
  comments: CommentRow[];
  abbreviations: AbbreviationDefinition[];
  onOpenComments: (target: CommentTarget) => void;
}) {
  const caption = getDelimitedTableCaption(blocks[0]?.text ?? "");
  const columnCount = Math.max(...blocks.map((block) => getDelimitedTableCells(block.text).length));
  const columnTemplate = getDelimitedTableColumnTemplate(columnCount);
  const minWidthClass = getDelimitedTableMinWidthClass(columnCount);

  return (
    <div
      role="table"
      aria-label={caption ?? "Таблица из конспекта"}
      data-reader-markdown-table="true"
      className="my-4 overflow-hidden rounded-lg border bg-card/40 text-sm"
    >
      {caption ? (
        <div className="border-b bg-muted/45 px-3 py-2 font-medium text-foreground">{caption}</div>
      ) : null}
      <div data-reader-table-scroll className="overflow-x-auto">
        <div className={cn("divide-y", minWidthClass)}>
          {blocks.map((block, index) => (
            <ContentTableRow
              key={block.id}
              block={block}
              theme={theme}
              comments={comments}
              abbreviations={abbreviations}
              isHeader={index === 0}
              columnTemplate={columnTemplate}
              onOpenComments={onOpenComments}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentTableRow({
  block,
  theme,
  comments,
  abbreviations,
  isHeader,
  columnTemplate,
  onOpenComments,
}: {
  block: ContentBlockRow;
  theme: ReaderTheme;
  comments: CommentRow[];
  abbreviations: AbbreviationDefinition[];
  isHeader: boolean;
  columnTemplate: string;
  onOpenComments: (target: CommentTarget) => void;
}) {
  const target = blockCommentTarget(block, theme);
  const count = commentsForTarget(comments, target).length;
  const cells = getDelimitedTableCells(block.text);

  return (
    <div
      id={block.block_key}
      role="row"
      className={cn(
        "group relative scroll-mt-24 transition-colors",
        isHeader ? "bg-muted/55" : "hover:bg-muted/45",
      )}
    >
      <div className="grid pr-12" style={{ gridTemplateColumns: columnTemplate }}>
        {cells.map((cell, cellIndex) => (
          <div
            key={`${block.id}-${cellIndex}`}
            role={isHeader ? "columnheader" : "cell"}
            className={cn(
              "min-w-0 border-r px-4 py-3 last:border-r-0 [overflow-wrap:anywhere]",
              isHeader
                ? "font-semibold text-foreground"
                : "whitespace-normal leading-7 text-foreground/90",
            )}
          >
            <AbbreviatedText
              text={cell}
              abbreviations={theme.theme_key === "abbreviations" ? [] : abbreviations}
            />
          </div>
        ))}
      </div>
      <div className="absolute right-2 top-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
        <CommentButton count={count} label="Комментарии к строке таблицы" onClick={() => onOpenComments(target)} />
      </div>
      <div className="px-3 pb-2">
        <InlineComments
          comments={commentsForTarget(comments, target)}
          onShowAll={() => onOpenComments(target)}
        />
      </div>
    </div>
  );
}

function getDelimitedTableColumnTemplate(columnCount: number) {
  if (columnCount === 6) {
    return "minmax(220px,0.8fr) minmax(210px,0.75fr) minmax(360px,1.25fr) minmax(320px,1.05fr) minmax(360px,1.25fr) minmax(330px,1.15fr)";
  }

  if (columnCount === 4) {
    return "minmax(180px, 0.85fr) minmax(250px, 1fr) minmax(340px, 1.35fr) minmax(420px, 1.65fr)";
  }

  return `repeat(${columnCount}, minmax(220px, 1fr))`;
}

function getDelimitedTableMinWidthClass(columnCount: number) {
  if (columnCount === 6) {
    return "min-w-[1800px]";
  }

  if (columnCount === 4) {
    return "min-w-[1190px]";
  }

  if (columnCount >= 3) {
    return "min-w-[760px]";
  }

  return "min-w-full";
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

function blockCommentTarget(block: ContentBlockRow, theme: ReaderTheme): CommentTarget {
  return {
    targetType: "block",
    themeId: theme.id,
    contentBlockId: block.id,
    title: block.kind === "heading" ? block.text : "Комментарий к абзацу",
    subtitle: theme.title,
  };
}

function isDelimitedTableBlock(block: ContentBlockRow | undefined) {
  return block?.kind === "bullet" && getDelimitedTableCells(block.text).length >= 3;
}

function getDelimitedTableCells(text: string) {
  const cells = text
    .split("|")
    .map((cell) => cell.trim())
    .filter(Boolean);

  if (cells.length < 3) {
    return [];
  }

  const captionDivider = cells[0].lastIndexOf(":");
  if (captionDivider >= 0) {
    const header = cells[0].slice(captionDivider + 1).trim();
    if (header) {
      cells[0] = header;
    }
  }

  return cells;
}

function getDelimitedTableCaption(text: string) {
  const firstPipeIndex = text.indexOf("|");
  if (firstPipeIndex < 0) {
    return null;
  }

  const firstCell = text.slice(0, firstPipeIndex).trim();
  const captionDivider = firstCell.lastIndexOf(":");
  if (captionDivider < 0) {
    return null;
  }

  const caption = firstCell.slice(0, captionDivider).trim();
  return caption.length > 0 ? caption : null;
}

function ThemeNav({
  themes,
  mode,
  selectedSlug,
  collapsed = false,
  collapsible = false,
  onCollapsedChange,
  onSelectTheme,
}: {
  themes: ReaderTheme[];
  mode: "all" | "single";
  selectedSlug?: string;
  collapsed?: boolean;
  collapsible?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onSelectTheme?: (slug: string) => void;
}) {
  return (
    <div
      data-reader-theme-nav={collapsed ? "collapsed" : "expanded"}
      className="flex h-full min-w-0 flex-col overflow-hidden"
    >
      <div className={cn("border-b px-3 py-4 transition-[padding] duration-300", collapsed && "px-2")}>
        <div className={cn("flex items-center gap-2 text-sm font-medium", collapsed && "justify-center")}>
          <PanelLeft className="size-4 shrink-0 text-primary" />
          <span
            className={cn(
              "min-w-0 overflow-hidden whitespace-nowrap transition-[opacity,width] duration-200",
              collapsed && "w-0 opacity-0",
            )}
          >
            Темы
          </span>
          {collapsible ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className={cn("ml-auto", collapsed && "ml-0")}
                  aria-label={collapsed ? "Развернуть список тем" : "Свернуть список тем"}
                  data-testid="reader-sidebar-collapse"
                  onClick={() => onCollapsedChange?.(!collapsed)}
                >
                  {collapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{collapsed ? "Развернуть" : "Свернуть"}</TooltipContent>
            </Tooltip>
          ) : null}
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <nav className={cn("space-y-1 p-2 transition-[padding] duration-300", collapsed && "px-2")}>
          {themes.map((theme) => (
            <Tooltip key={theme.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedSlug === theme.slug ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                  className={cn(
                    "h-auto w-full justify-start whitespace-normal px-2.5 py-2 text-left transition-all duration-300",
                    collapsed && "h-9 justify-center rounded-lg px-0 py-0 text-center",
                  )}
                >
                  <Link
                    href={mode === "all" ? `#${theme.slug}` : `/themes/${theme.slug}`}
                    aria-label={collapsed ? `${theme.sort_order}. ${theme.title}` : undefined}
                    onClick={(event) => {
                      if (mode !== "all") {
                        return;
                      }

                      event.preventDefault();
                      onSelectTheme?.(theme.slug);
                    }}
                  >
                    <span
                      className={cn(
                        "mr-2 text-xs text-muted-foreground transition-[margin,color] duration-300",
                        selectedSlug === theme.slug && collapsed && "text-primary",
                        collapsed && "mr-0 text-sm font-semibold",
                      )}
                    >
                      {theme.sort_order}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 transition-[opacity,width] duration-200",
                        collapsed && "sr-only",
                      )}
                    >
                      {theme.title}
                    </span>
                  </Link>
                </Button>
              </TooltipTrigger>
              {collapsed ? <TooltipContent side="right">{theme.title}</TooltipContent> : null}
            </Tooltip>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}

function MobileThemeNav({
  themes,
  mode,
  selectedSlug,
  onSelectTheme,
}: {
  themes: ReaderTheme[];
  mode: "all" | "single";
  selectedSlug?: string;
  onSelectTheme: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden" aria-label="Открыть список тем">
          <List className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(90vw,360px)] p-0">
        <SheetHeader className="border-b px-4 py-4 text-left">
          <SheetTitle>Темы</SheetTitle>
          <SheetDescription className="sr-only">
            Список тем конспекта для перехода к отдельной теме.
          </SheetDescription>
        </SheetHeader>
        {mode === "single" ? (
          <div className="border-b p-3">
            <Button variant="secondary" size="sm" className="w-full justify-start" asChild>
              <Link href="/themes">
                <List className="size-4" />
                Все темы одним списком
              </Link>
            </Button>
          </div>
        ) : null}
        <ThemeNav
          themes={themes}
          mode={mode}
          selectedSlug={selectedSlug}
          onSelectTheme={(slug) => {
            setOpen(false);
            onSelectTheme(slug);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

function AllThemesFloatingNav({
  themes,
  activeIndex,
  sidebarCollapsed,
  onSelectTheme,
}: {
  themes: ReaderTheme[];
  activeIndex: number;
  sidebarCollapsed: boolean;
  onSelectTheme: (slug: string) => void;
}) {
  const activeTheme = themes[activeIndex] ?? themes[0];
  const previousTheme = activeIndex > 0 ? themes[activeIndex - 1] : null;
  const nextTheme = activeIndex < themes.length - 1 ? themes[activeIndex + 1] : null;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!activeTheme) {
    return null;
  }

  function chooseTheme(slug: string) {
    setOpen(false);
    onSelectTheme(slug);
  }

  return (
    <div
      data-testid="all-themes-floating-nav"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-40 flex justify-center px-3 transition-[left] duration-300 ease-out md:justify-end md:pr-6",
        sidebarCollapsed ? "md:left-[96px]" : "md:left-[300px]",
      )}
    >
      <div
        ref={rootRef}
        data-reader-theme-jump={open ? "open" : "closed"}
        className="pointer-events-auto relative flex w-full max-w-[min(100%,34rem)] items-center gap-1 rounded-lg border bg-background/95 p-1 shadow-lg shadow-foreground/10 backdrop-blur md:w-auto"
      >
        <div
          className={cn(
            "fixed bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] left-3 right-3 z-20 origin-bottom rounded-lg border bg-background/98 p-2 shadow-lg shadow-foreground/10 backdrop-blur transition-[opacity,transform] duration-200 ease-out md:left-auto md:right-6 md:w-[min(34rem,calc(100vw-2rem))]",
            open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-[0.98] opacity-0",
          )}
        >
          <div
            data-reader-theme-menu-scroll
            className="max-h-[min(56svh,30rem)] overflow-y-auto overscroll-contain pr-1"
          >
            <nav className="space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={cn(
                    "grid w-full grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted",
                    theme.id === activeTheme.id && "bg-secondary text-secondary-foreground",
                  )}
                  onClick={() => chooseTheme(theme.slug)}
                >
                  <span className="text-xs font-semibold text-muted-foreground">{theme.sort_order}</span>
                  <span className="min-w-0 whitespace-normal leading-5">{theme.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              aria-label="Предыдущая тема"
              data-testid="reader-floating-prev"
              disabled={!previousTheme}
              onClick={() => previousTheme && onSelectTheme(previousTheme.slug)}
            >
              <ChevronUp className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Предыдущая тема</TooltipContent>
        </Tooltip>

        <button
          type="button"
          className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted md:w-80"
          aria-label="Открыть список всех тем"
          aria-expanded={open}
          data-testid="reader-theme-jump-trigger"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Тема {activeIndex + 1} из {themes.length}
            </span>
            <span className="block truncate text-sm font-semibold text-foreground">{activeTheme.title}</span>
          </span>
          <ChevronDown
            className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")}
          />
        </button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              aria-label="Следующая тема"
              data-testid="reader-floating-next"
              disabled={!nextTheme}
              onClick={() => nextTheme && onSelectTheme(nextTheme.slug)}
            >
              <ChevronDown className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Следующая тема</TooltipContent>
        </Tooltip>
      </div>
    </div>
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

function findCurrentThemeSlug(themes: ReaderTheme[]) {
  if (themes.length === 0) {
    return null;
  }

  const scrollBottom =
    document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

  if (scrollBottom <= 4) {
    return themes[themes.length - 1]?.slug ?? null;
  }

  let currentSlug = themes[0]?.slug ?? null;

  for (const theme of themes) {
    const themeElement = document.getElementById(theme.slug);

    if (!themeElement) {
      continue;
    }

    if (themeElement.getBoundingClientRect().top <= READER_SCROLL_OFFSET_PX) {
      currentSlug = theme.slug;
      continue;
    }

    break;
  }

  return currentSlug;
}

function useHasHydrated() {
  return useSyncExternalStore(subscribeToHydration, getHydratedSnapshot, getServerHydrationSnapshot);
}

function subscribeToHydration(listener: () => void) {
  const timeout = window.setTimeout(listener, 0);
  return () => window.clearTimeout(timeout);
}

function getHydratedSnapshot() {
  return true;
}

function getServerHydrationSnapshot() {
  return false;
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
