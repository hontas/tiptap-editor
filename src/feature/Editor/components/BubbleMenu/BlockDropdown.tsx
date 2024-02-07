import { Editor } from "@tiptap/react";
import { useState } from "react";
import styles from "./BubbleMenu.module.css";
import { IconChevronDown } from "../icons";
import { Button } from "../Button";
import { Node } from "@tiptap/pm/model";

interface BlockDropdownProps<E extends Editor> {
  editor: E;
}

const getNameFromNode = (node: Node) => {
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

  return "Unknown";
};

export const BlockDropdown = <E extends Editor>({
  editor,
}: BlockDropdownProps<E>) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isTable = editor.isActive("table");

  return (
    <div className={styles.dropdownContainer}>
      {!isTable && (
        <Button onClick={() => setShowDropdown((prev) => !prev)}>
          <span>{getNameFromNode(editor.state.selection.$anchor.parent)}</span>
          <IconChevronDown />
        </Button>
      )}
      {showDropdown && (
        <div className={styles.dropdown}>
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            Text
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            Heading
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            Subheading
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bulleted list
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            Numbered list
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            Code block
          </Button>
        </div>
      )}
    </div>
  );
};
