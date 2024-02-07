import { Editor } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";

import {
  IconBold,
  IconCode,
  IconItalic,
  IconMoore,
  IconStrike,
  IconUnderline,
} from "../icons";
import { Button, ButtonRound } from "../Button";
import { Toolbar, ToolbarDivider } from "../Toolbar";
import { keyboardShortcuts } from "../../extensions";
import { MenuDropdown } from "../MenuDropdown";

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
          <MenuDropdown
            title={getNameFromNode(editor.state.selection.$anchor.parent)}
            options={[
              {
                onClick: () => editor.chain().focus().setParagraph().run(),
                className: editor.isActive("paragraph") ? "is-active" : "",
                children: "Text",
              },
              {
                onClick: () =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run(),
                className: editor.isActive("heading", { level: 1 })
                  ? "is-active"
                  : "",
                children: "Heading",
              },
              {
                onClick: () =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run(),
                className: editor.isActive("heading", { level: 2 })
                  ? "is-active"
                  : "",
                children: "Subheading",
              },
              {
                onClick: () => editor.chain().focus().toggleBulletList().run(),
                className: editor.isActive("bulletList") ? "is-active" : "",
                children: "Bulleted list",
              },
              {
                onClick: () => editor.chain().focus().toggleOrderedList().run(),
                className: editor.isActive("orderedList") ? "is-active" : "",
                children: "Numbered list",
              },
              {
                onClick: () => editor.chain().focus().toggleCodeBlock().run(),
                className: editor.isActive("codeBlock") ? "is-active" : "",
                children: "Code block",
              },
            ]}
          />
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

function getNameFromNode(node: Node) {
  if (node.type.name === "paragraph") {
    return "Text";
  }
  if (node.type.name === "heading") {
    return node.attrs.level === 2
      ? "Heading"
      : node.attrs.level === 3
        ? "Subheading"
        : `Heading ${node.attrs.level}`;
  }

  return node.type.name;
}
