import { MessageSquareText } from "lucide-react";

import type { CommentRow } from "../../types/database";

export function InlineComments({
  comments,
  onShowAll,
}: {
  comments: CommentRow[];
  onShowAll: () => void;
}) {
  if (comments.length === 0) {
    return null;
  }

  const visibleComments = comments.slice(0, 2);
  const hiddenCount = comments.length - visibleComments.length;

  return (
    <aside className="border-l-2 border-primary/35 pl-3 lg:min-h-full">
      <button
        type="button"
        className="mb-2 flex w-full items-center gap-2 text-left text-xs font-medium text-primary"
        onClick={onShowAll}
      >
        <MessageSquareText className="size-3.5" />
        {comments.length} {pluralizeComment(comments.length)}
      </button>
      <div className="space-y-2">
        {visibleComments.map((comment) => (
          <button
            key={comment.id}
            type="button"
            className="block w-full rounded-md bg-accent/60 px-2 py-1.5 text-left transition-colors hover:bg-accent"
            onClick={onShowAll}
          >
            <span className="block truncate text-xs font-medium">{comment.author_name}</span>
            <span className="line-clamp-2 text-xs leading-5 text-muted-foreground">
              {comment.body}
            </span>
          </button>
        ))}
      </div>
      {hiddenCount > 0 ? (
        <button
          type="button"
          className="mt-2 h-auto px-0 text-xs font-medium text-primary hover:underline"
          onClick={onShowAll}
        >
          Показать все: {comments.length}
        </button>
      ) : null}
    </aside>
  );
}

export function pluralizeComment(count: number) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "комментарий";
  }

  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return "комментария";
  }

  return "комментариев";
}
