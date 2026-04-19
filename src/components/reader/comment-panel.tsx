"use client";

import { useActionState, useEffect, useRef } from "react";
import { MessageSquarePlus } from "lucide-react";

import { createComment } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { CommentActionState } from "@/lib/validation/comments";
import type { CommentRow } from "@/types/database";

export interface CommentTarget {
  targetType: "theme" | "block";
  themeId: string;
  contentBlockId: string | null;
  title: string;
  subtitle: string;
}

interface CommentPanelProps {
  open: boolean;
  isDesktop: boolean;
  target: CommentTarget | null;
  comments: CommentRow[];
  onOpenChange: (open: boolean) => void;
}

const initialState: CommentActionState = {
  ok: false,
  message: "",
};

export function CommentPanel({
  open,
  isDesktop,
  target,
  comments,
  onOpenChange,
}: CommentPanelProps) {
  if (!target) {
    return null;
  }

  const content = (
    <PanelContent
      key={`${target.targetType}-${target.contentBlockId ?? target.themeId}`}
      target={target}
      comments={comments}
    />
  );

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[420px] overflow-y-auto sm:max-w-[420px]">
          <SheetHeader>
            <SheetTitle>{target.title}</SheetTitle>
            <SheetDescription>{target.subtitle}</SheetDescription>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl px-4 pb-6">
          <DrawerHeader className="px-0 text-left">
            <DrawerTitle>{target.title}</DrawerTitle>
            <DrawerDescription>{target.subtitle}</DrawerDescription>
          </DrawerHeader>
          {content}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function PanelContent({ target, comments }: { target: CommentTarget; comments: CommentRow[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createComment, initialState);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <div className="mt-6 space-y-6">
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MessageSquarePlus className="size-4 text-primary" />
          Комментарии
        </div>
        {comments.length > 0 ? (
          <div className="space-y-3">
            {comments.map((comment) => (
              <article key={comment.id} className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{comment.author_name}</p>
                  <time className="text-xs text-muted-foreground" dateTime={comment.created_at}>
                    {new Intl.DateTimeFormat("ru", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(comment.created_at))}
                  </time>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                  {comment.body}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            Здесь пока нет комментариев.
          </p>
        )}
      </section>

      <Separator />

      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="themeId" value={target.themeId} />
        <input type="hidden" name="contentBlockId" value={target.contentBlockId ?? ""} />
        <input type="hidden" name="targetType" value={target.targetType} />

        <div className="space-y-2">
          <Label htmlFor="authorName">Имя</Label>
          <Input id="authorName" name="authorName" maxLength={80} required placeholder="Например, Максим" />
          {state.fieldErrors?.authorName ? (
            <p className="text-xs text-destructive">{state.fieldErrors.authorName[0]}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Комментарий</Label>
          <Textarea
            id="body"
            name="body"
            maxLength={2000}
            required
            rows={5}
            placeholder="Уточнение, вопрос или заметка для группы"
          />
          {state.fieldErrors?.body ? (
            <p className="text-xs text-destructive">{state.fieldErrors.body[0]}</p>
          ) : null}
        </div>

        {state.message ? (
          <p className={state.ok ? "text-sm text-primary" : "text-sm text-destructive"}>
            {state.message}
          </p>
        ) : null}

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Отправка..." : "Оставить комментарий"}
        </Button>
      </form>
    </div>
  );
}
