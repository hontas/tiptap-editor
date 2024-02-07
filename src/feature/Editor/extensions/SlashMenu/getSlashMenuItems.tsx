import {
  RiImageAddLine,
  RiH2,
  RiTable2,
  RiHeading,
  RiListUnordered,
  RiCodeSSlashLine,
} from "react-icons/ri";

import { Suggestion, SlashMenuItem } from "./types";
import { keyboardShortcuts } from "..";

type ItemsFunc = Suggestion["items"];
type CommandFunc = Suggestion["command"];
type CommandProps = Parameters<NonNullable<CommandFunc>>[0];

const iconSize = 30;

export const getSlashMenuItems: ItemsFunc = ({
  query,
  editor,
}): SlashMenuItem[] => {
  const inTable = editor.isActive("table");

  if (inTable) return [];

  const items: SlashMenuItem[] = [
    {
      title: "Heading",
      description: "Use for main sections",
      shortcut: keyboardShortcuts["heading"]?.[0],
      icon: <RiHeading size={iconSize} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "Subheading",
      description: "Use for subsections",
      shortcut: keyboardShortcuts["heading"]?.[1],
      icon: <RiH2 size={iconSize} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: "Image",
      description: "Embed an image with a link",
      shortcut: keyboardShortcuts["image"]?.[0],
      icon: <RiImageAddLine size={iconSize} />,
      command: ({ editor, range }: CommandProps) => {
        console.log("call some function from parent");
        editor.chain().focus().deleteRange(range).setImage({ src: "" }).run();
      },
    },
    {
      title: "Table",
      description: "Add simple tabular data",
      icon: <RiTable2 size={iconSize} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).run();
        editor.commands.insertTable({
          rows: 3,
          cols: 3,
          withHeaderRow: true,
        });
      },
    },
    {
      title: "Bulleted list",
      description: "Create a bulleted list",
      shortcut: keyboardShortcuts["bulletList"]?.[0],
      icon: <RiListUnordered size={iconSize} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Code block",
      description: "Write some code",
      shortcut: keyboardShortcuts["codeBlock"]?.[0],
      icon: <RiCodeSSlashLine size={iconSize} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setCodeBlock({ language: "plaintext" })
          .run();
      },
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);

  return items;
};
