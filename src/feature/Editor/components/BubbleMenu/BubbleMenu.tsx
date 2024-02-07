import { Editor } from "@tiptap/react";

import {
  IconBold,
  IconCode,
  IconItalic,
  IconMoore,
  IconStrike,
  IconUnderline,
} from "../icons";
import { BlockDropdown } from "./BlockDropdown";
import { Button, ButtonRound } from "../Button";
import { Toolbar, ToolbarDivider } from "../Toolbar";
import { keyboardShortcuts } from "../../extensions";

interface BubbleMenuContentProps {
  editor: Editor;
}

export const BubbleMenuContent = ({ editor }: BubbleMenuContentProps) => {
  if (!editor) {
    return null;
  }

  return (
    <Toolbar>
      {!editor.isActive("table") && (
        <>
          <BlockDropdown editor={editor} />
          <ToolbarDivider />
        </>
      )}
      <ButtonRound
        title={keyboardShortcuts["bold"]?.[0]}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <IconBold />
      </ButtonRound>
      <ButtonRound
        title={keyboardShortcuts["italic"]?.[0]}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <IconItalic />
      </ButtonRound>
      <ButtonRound
        title={keyboardShortcuts["underline"]?.[0]}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <IconUnderline />
      </ButtonRound>
      <ButtonRound
        title={keyboardShortcuts["strike"]?.[0]}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <IconStrike />
      </ButtonRound>
      <ButtonRound
        title={keyboardShortcuts["code"]?.[0]}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <IconCode />
      </ButtonRound>
      <ToolbarDivider />
      <Button
        onClick={() => {
          /* mock fn */
        }}
        disabled={true}
      >
        <IconMoore />
      </Button>
    </Toolbar>
  );
};
