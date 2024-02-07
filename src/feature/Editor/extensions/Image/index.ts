import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageComponent } from "./ImageComponent";

export default Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      "Mod-Alt-i": () => this.editor.commands.setImage({ src: "" }),
    };
  },
});
