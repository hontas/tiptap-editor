import { unified } from "unified";
import rehypeParse from "rehype-parse";
import remarkGfm from "remark-gfm";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

export function htmlToMarkdown(html: string) {
  return unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify)
    .processSync(html)
    .toString();
}
