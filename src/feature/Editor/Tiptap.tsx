import { useCallback, useEffect, useRef, useState } from "react";
import {
  // EditorProvider,
  FloatingMenu,
  BubbleMenu,
  EditorEvents,
  useEditor,
  EditorContent,
} from "@tiptap/react";
import { BubbleMenuContent } from "./components/BubbleMenu";
// import { Menubar } from "./components/Menubar";
import extensions from "./extensions";
import "./Tiptap.css";
import { markdownToHtml } from "../../utils/markdownToHtml";

interface EditorProps {
  editable: boolean;
  content?: string;
  onUpdate?: (htmlString: string) => void;
}

export const Tiptap = ({ editable, content = "", onUpdate }: EditorProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const internalOnUpdate = useCallback(
    ({ editor }: EditorEvents["update"]) => {
      if (!onUpdate) return;

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        onUpdate(editor.getHTML());
      }, 1000);
    },
    [onUpdate],
  );

  const editor = useEditor({
    extensions,
    content,
    editable,
    onUpdate: internalOnUpdate,
  });

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable, editor]);

  // convert input markdown to HTML
  useEffect(() => {
    if (!content || !editor) return;

    (async () => {
      if (!content) return;
      const isHtml = content.startsWith("<");
      if (isHtml) {
        console.log("set html content", content);
        editor.commands.setContent(content);
      } else {
        const vFile = await markdownToHtml(content);
        editor.commands.setContent(vFile.value.toString());
      }
    })();
  }, [content, editor]);

  if (!editor) return null;

  return (
    <>
      <EditorContent editor={editor} />
      {/* <EditorProvider
        extensions={extensions}
        content={content}
        editable={editable}
        onUpdate={internalOnUpdate}
      > */}
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu>
        <BubbleMenuContent />
      </BubbleMenu>
      {/* </EditorProvider> */}
    </>
  );
};
