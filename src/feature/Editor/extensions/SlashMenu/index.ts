import { Suggestions } from "../Suggestions";
import { getSlashMenuItems } from "./getSlashMenuItems";
import { renderItems } from "./renderItems";

export default Suggestions.configure({
  suggestion: {
    char: "/",
    items: getSlashMenuItems,
    render: renderItems,
  },
});
