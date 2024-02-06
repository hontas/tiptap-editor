import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { SlashMenu, SlashMenuRef } from "./SlashMenu";
import {
  SuggestionProps,
  SlashMenuItem,
  SuggestionKeyDownProps,
} from "./types";

export const renderItems = () => {
  let component: ReactRenderer<SlashMenuRef>;
  let popup: ReturnType<typeof tippy>;

  return {
    onStart: (props: SuggestionProps<SlashMenuItem>) => {
      component = new ReactRenderer(SlashMenu, {
        props,
        editor: props.editor,
      });

      popup = tippy("body", {
        getReferenceClientRect: props.clientRect as any,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate(props: SuggestionProps<SlashMenuItem>) {
      component.updateProps(props);

      popup[0].setProps({
        getReferenceClientRect: props.clientRect as any,
      });
    },
    onKeyDown(props: SuggestionKeyDownProps) {
      if (props.event.key === "Escape") {
        popup[0].hide();

        return true;
      }

      return component.ref?.onKeyDown(props) || false;
    },
    onExit() {
      popup[0].destroy();
      component.destroy();
    },
  };
};

export default renderItems;
