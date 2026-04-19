import path from "node:path";

export const SOURCE_MARKDOWN_RELATIVE_PATH = "content/source.md";

export const SOURCE_MARKDOWN_PATH = path.resolve(process.cwd(), SOURCE_MARKDOWN_RELATIVE_PATH);
