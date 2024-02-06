import { useCurrentEditor } from "@tiptap/react";
import styles from "./BubbleMenu.module.css";
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

export const BubbleMenuContent = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.container}>
      <BlockDropdown editor={editor} />
      <div className={styles.divider} />
      <ButtonRound
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <IconBold />
      </ButtonRound>
      <ButtonRound
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <IconItalic />
      </ButtonRound>
      <ButtonRound
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <IconUnderline />
      </ButtonRound>
      <ButtonRound
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <IconStrike />
      </ButtonRound>
      <ButtonRound
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <IconCode />
      </ButtonRound>
      <div className={styles.divider} />
      <Button
        onClick={() => {
          /* mock fn */
        }}
        disabled={true}
      >
        <IconMoore />
      </Button>
    </div>
  );
};
