import StarterKit, { StarterKitOptions } from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Link from "@tiptap/extension-link";
import Image from "./Image";
import CodeBlockLowlight from "./CodeBlock";

import SlashMenu from "./SlashMenu";
import { formatKeyboardShortcut } from "../../../utils";

const extensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  CodeBlockLowlight,
  Underline,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Image,
  Link,
  SlashMenu,
];

const starterKitThis = { options: {} };
const extensionThis = { options: { levels: [1, 2, 3, 4, 5, 6] } };

const starterKitExtensions =
  // @ts-expect-error just wanna get the keys
  StarterKit.config.addExtensions.call(starterKitThis);
const allExtensions = starterKitExtensions.concat(extensions);

type ExtensionKeys = keyof StarterKitOptions | "image" | "underline" | "link";
type KeyboardShortcuts = Partial<Record<ExtensionKeys, string[] | undefined>>;

export const keyboardShortcuts = allExtensions.reduce<KeyboardShortcuts>(
  (acc, extension) => {
    if (extension.config.addKeyboardShortcuts) {
      const shortcuts =
        // @ts-expect-error just wanna get the keys
        extension.config.addKeyboardShortcuts.call(extensionThis);
      acc[extension.name as ExtensionKeys] = Object.keys(shortcuts).map(
        formatKeyboardShortcut,
      );
    }

    return acc;
  },
  {},
);

export default extensions;
