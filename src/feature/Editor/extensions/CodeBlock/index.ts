import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { createLowlight, common } from "lowlight";
import { CodeBlockComponent } from "./CodeBlockComponent";

const lowlight = createLowlight(common);

export default CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({
  lowlight,
});
