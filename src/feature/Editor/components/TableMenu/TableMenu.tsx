import { BubbleMenu, BubbleMenuProps, Editor } from "@tiptap/react";
import { GetReferenceClientRect } from "tippy.js";

import { IconMoore, IconTrash } from "../icons";
import { Button, ButtonRound } from "../Button";
import { Toolbar, ToolbarDivider } from "../Toolbar";
import { MenuDropdown } from "../MenuDropdown";
import { Node } from "@tiptap/pm/model";

interface TableMenuProps {
  editor: Editor;
}

export const TableMenu = ({ editor }: TableMenuProps) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: "bottom",
        getReferenceClientRect: getReferenceClientRect(editor),
      }}
    >
      <Toolbar>
        <MenuDropdown
          title="Table actions"
          options={[
            {
              onClick: () => editor.commands.addRowBefore(),
              children: "Add row before",
            },
            {
              onClick: () => editor.commands.addRowAfter(),
              children: "Add row after",
            },
            {
              onClick: () => editor.commands.addColumnBefore(),
              children: "Add column before",
            },
            {
              onClick: () => editor.commands.addColumnAfter(),
              children: "Add column after",
            },
            {
              onClick: () => editor.commands.deleteRow(),
              children: "Remove row",
            },
            {
              onClick: () => editor.commands.deleteColumn(),
              children: "Remove column",
            },
          ]}
        />
        <ButtonRound
          onClick={() => editor.commands.deleteTable()}
          title="Remove table"
        >
          <IconTrash />
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
    </BubbleMenu>
  );
};

const shouldShow: BubbleMenuProps["shouldShow"] = ({ editor, view }) => {
  const shouldShow =
    view.hasFocus() && editor.isEditable && editor.isActive("table");

  return shouldShow;
};

// get the current active table's bounding client rect
const getReferenceClientRect =
  (editor: Editor): GetReferenceClientRect =>
  () => {
    const anchor = editor.view.state.selection.$anchor;
    const path = "path" in anchor ? (anchor.path as (Node | number)[]) : [];
    const indexOfTable = path.findIndex((p) => {
      if (typeof p === "number") return false;
      return p.type.name === "table";
    });
    const domNodeIndex = path[indexOfTable - 1] as number;

    if (typeof domNodeIndex === "number") {
      const domNode = editor.view.nodeDOM(domNodeIndex);
      if (domNode instanceof HTMLElement) {
        return domNode.getBoundingClientRect();
      }
    }

    return editor.$doc.element.getBoundingClientRect();
  };
