import {
  SuggestionsOptions,
  SuggestionProps,
  SuggestionKeyDownProps,
} from "../Suggestions";

type Suggestion = SuggestionsOptions["suggestion"];

export type { Suggestion, SuggestionProps, SuggestionKeyDownProps };

export interface SlashMenuItem {
  title: string;
  command: Suggestion["command"];
  icon?: React.ReactNode;
  description: string;
  shortcut?: string;
}
