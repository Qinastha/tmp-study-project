import { Database, FileWarning, UploadCloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface ReaderEmptyStateProps {
  error: string | null;
}

export function ReaderEmptyState({ error }: ReaderEmptyStateProps) {
  return (
    <main className="min-h-svh bg-background">
      <header className="border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary">АИТ Reader</p>
            <p className="text-xs text-muted-foreground">Supabase setup</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto grid max-w-3xl gap-8 px-4 py-16">
        <div className="space-y-4">
          <Badge variant="outline" className="w-fit">
            {error ? "Ошибка загрузки" : "Ожидает данные"}
          </Badge>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Конспект готов к чтению после применения схемы и seed-данных.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            В приложении уже есть миграции, RLS, realtime-подписка и MCP-first обновление
            контента. Если здесь пусто, примените миграции и payload через Supabase MCP.
          </p>
        </div>

        <Separator />

        <div className="grid gap-4 text-sm sm:grid-cols-3">
          <div className="space-y-2">
            <Database className="size-5 text-primary" />
            <p className="font-medium">1. Env</p>
            <p className="text-muted-foreground">Заполнить `.env.local` и Vercel Environment Variables.</p>
          </div>
          <div className="space-y-2">
            <UploadCloud className="size-5 text-primary" />
            <p className="font-medium">2. Push</p>
            <p className="text-muted-foreground">Запустить `npm run content:export`, затем применить payload через MCP.</p>
          </div>
          <div className="space-y-2">
            <FileWarning className="size-5 text-primary" />
            <p className="font-medium">3. Reader</p>
            <p className="text-muted-foreground">После seed темы появятся на `/themes`.</p>
          </div>
        </div>

        {error ? (
          <pre className="overflow-auto rounded-lg border bg-muted p-4 text-xs text-muted-foreground">
            {error}
          </pre>
        ) : null}
      </section>
    </main>
  );
}
