import { useCallback, useEffect, useRef } from "react";
import {
  FloatingMenu,
  BubbleMenu,
  EditorEvents,
  useEditor,
  EditorContent,
} from "@tiptap/react";
import { BubbleMenuContent } from "./components/BubbleMenu";
import extensions from "./extensions";
import "./Tiptap.css";
import { TableMenu } from "./components/TableMenu";

interface EditorProps {
  editable: boolean;
  content?: string;
  onUpdate?: (htmlString: string) => void;
}

export const Tiptap = ({ editable, content, onUpdate }: EditorProps) => {
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
    editable,
    onUpdate: internalOnUpdate,
  });

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable, editor]);

  useEffect(() => {
    if (!content || !editor) return;
    setTimeout(() => {
      editor.commands.setContent(content);
    });
  }, [content, editor]);

  if (!editor) return null;

  return (
    <>
      <EditorContent editor={editor} />

      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>
        <BubbleMenuContent editor={editor} />
      </BubbleMenu>
      <TableMenu editor={editor} />
    </>
  );
};
