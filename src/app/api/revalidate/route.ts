import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { COMMENTS_CACHE_TAG, CONTENT_CACHE_TAG } from "../../../lib/content/cache-policy";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const requestUrl = new URL(request.url);
  const requestSecret =
    request.headers.get("x-revalidate-secret") ?? requestUrl.searchParams.get("secret");

  if (!secret || requestSecret !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  revalidateTag(CONTENT_CACHE_TAG, { expire: 0 });
  revalidateTag(COMMENTS_CACHE_TAG, { expire: 0 });
  revalidatePath("/themes");
  revalidatePath("/themes/[slug]", "page");

  return NextResponse.json({ ok: true });
}
