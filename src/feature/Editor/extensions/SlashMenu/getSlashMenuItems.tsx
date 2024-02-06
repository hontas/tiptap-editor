import { Suggestion, SlashMenuItem } from "./types";

type ItemsFunc = Suggestion["items"];
type CommandFunc = Suggestion["command"];
type CommandProps = Parameters<NonNullable<CommandFunc>>[0];

export const getSlashMenuItems: ItemsFunc = ({
  query,
  editor,
}): SlashMenuItem[] => {
  const inTable = editor.isActive("table");
  console.log("getSlashMenuItems", inTable);

  const items: SlashMenuItem[] = [
    {
      title: "Heading",
      description: "Use for main sections",
      shortcut: "Mod-Alt-1",
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
      shortcut: "Mod-Alt-2",
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
      command: ({ editor, range }: CommandProps) => {
        console.log("call some function from parent");
        editor.chain().focus().deleteRange(range).setImage({ src: "" }).run();
      },
    },
    {
      title: "Table",
      description: "Add simple tabular data",
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
      description: "Create a simple bulleted list",
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Code block",
      description: "Write some code",
      shortcut: "Mod-Alt-c",
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);

  return items;
};
