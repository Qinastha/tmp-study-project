import { z } from "zod";

export const commentSchema = z
  .object({
    themeId: z.string().uuid("Некорректная тема."),
    contentBlockId: z.string().uuid("Некорректный абзац.").optional().nullable(),
    targetType: z.enum(["theme", "block"]),
    authorName: z
      .string()
      .trim()
      .min(2, "Имя должно быть не короче 2 символов.")
      .max(80, "Имя слишком длинное."),
    body: z
      .string()
      .trim()
      .min(2, "Комментарий слишком короткий.")
      .max(2000, "Комментарий слишком длинный."),
  })
  .superRefine((value, context) => {
    if (value.targetType === "theme" && value.contentBlockId) {
      context.addIssue({
        code: "custom",
        path: ["contentBlockId"],
        message: "Комментарий к теме не должен ссылаться на абзац.",
      });
    }

    if (value.targetType === "block" && !value.contentBlockId) {
      context.addIssue({
        code: "custom",
        path: ["contentBlockId"],
        message: "Для комментария к абзацу нужен идентификатор абзаца.",
      });
    }
  });

export type CommentInput = z.infer<typeof commentSchema>;

export interface CommentActionState {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof CommentInput, string[]>>;
}

export function validateCommentPayload(payload: unknown) {
  return commentSchema.safeParse(payload);
}
