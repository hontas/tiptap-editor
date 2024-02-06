import { Extension } from "@tiptap/core";
import Suggestion, {
  SuggestionOptions,
  SuggestionProps,
  SuggestionKeyDownProps,
} from "@tiptap/suggestion";

export type { SuggestionProps, SuggestionKeyDownProps };

export interface SuggestionsOptions {
  suggestion: Omit<SuggestionOptions, "editor">;
}

export const Suggestions = Extension.create<SuggestionsOptions>({
  name: "suggestions",

  addOptions() {
    return {
      suggestion: {
        command: ({ editor, range, props }) => {
          props.command({ editor, range, props });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
