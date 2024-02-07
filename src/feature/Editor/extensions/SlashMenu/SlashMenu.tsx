import { useCallback, useState, forwardRef, useImperativeHandle } from "react";
import { SuggestionProps, SlashMenuItem } from "./types";
import styles from "./SlashMenu.module.css";
import { Editor } from "@tiptap/react";
import { Button } from "../../components/Button";

interface SlashMenuProps {
  editor: Editor;
  items: SlashMenuItem[];
  command: SuggestionProps<SlashMenuItem>["command"];
}

export interface SlashMenuRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const SlashMenu = forwardRef<SlashMenuRef, SlashMenuProps>(
  function SlashMenu({ editor, items, command }, ref) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = useCallback(
      (index: number) => {
        const item = items[index];

        if (item) {
          command(item);
        }
      },
      [command, items],
    );

    const upHandler = () => {
      setSelectedIndex((currIndex) => {
        return (currIndex + items.length - 1) % items.length;
      });
    };

    const downHandler = () => {
      setSelectedIndex((currIndex) => {
        return (currIndex + 1) % items.length;
      });
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    const onKeyDown = useCallback(
      ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    useImperativeHandle(
      ref,
      () => ({
        onKeyDown,
      }),
      [onKeyDown],
    );

    if (!editor) {
      return null;
    }

    return (
      <div className={styles.items}>
        {items.map((item, index) => (
          <Button
            className={`${styles.item} ${
              index === selectedIndex ? styles.itemSelected : ""
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.text}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.description}>{item.description}</span>
            </div>
            <div className={styles.shortcut}>
              {item.shortcut && item.shortcut}
            </div>
          </Button>
        ))}
      </div>
    );
  },
);
