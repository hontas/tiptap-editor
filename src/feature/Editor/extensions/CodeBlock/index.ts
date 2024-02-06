import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { createLowlight, common } from "lowlight";
// @ts-expect-error no types
import cypher from "highlightjs-cypher";
import "highlight.js/styles/a11y-light.css";
import { CodeBlockComponent } from "./CodeBlockComponent";

const languages = { ...common, cypher };
const lowlight = createLowlight(languages);

export default CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({
  lowlight,
});
