"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { commentSchema, type CommentActionState } from "@/lib/validation/comments";

export async function createComment(
  _previousState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> {
  const parsed = commentSchema.safeParse({
    themeId: formData.get("themeId"),
    contentBlockId: formData.get("contentBlockId") || null,
    targetType: formData.get("targetType"),
    authorName: formData.get("authorName"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Проверьте поля комментария.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.rpc("create_comment", {
    p_theme_id: parsed.data.themeId,
    p_theme_content_block_id: parsed.data.contentBlockId ?? null,
    p_target_type: parsed.data.targetType,
    p_author_name: parsed.data.authorName,
    p_body: parsed.data.body,
  });

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  revalidatePath("/themes");

  return {
    ok: true,
    message: "Комментарий добавлен.",
  };
}
