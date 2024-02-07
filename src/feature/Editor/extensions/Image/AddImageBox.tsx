import { useCallback, useState } from "react";
import styles from "./AddImageBox.module.css";
import { ButtonRound } from "../../components/Button";

interface AddImageBoxProps {
  onAddImage: (src: string) => void;
  close: () => void;
  src?: string;
}

export const AddImageBox = ({ onAddImage, close, src }: AddImageBoxProps) => {
  const [value, setValue] = useState(src || "");
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const value = (event.nativeEvent.target as HTMLInputElement)?.value;
      if (event.key === "Enter" && value) {
        onAddImage(value);
      }
    },
    [onAddImage],
  );

  return (
    <div className={styles.addImageBox}>
      <header className={styles.addImageBoxHeader}>
        <span>{src ? "Replace image" : "Add an image"}</span>
        {src && (
          <ButtonRound onClick={close} className={styles.closeBtn}>
            ✕
          </ButtonRound>
        )}
      </header>
      <div className={styles.addImageBoxRow}>
        <input
          autoFocus
          type="url"
          value={value}
          onKeyDown={onKeyDown}
          onPaste={(event) => {
            const pasted = event.clipboardData?.getData("text");
            if (pasted) {
              setValue(pasted);
              onAddImage(pasted);
            }
          }}
          onChange={(event) => setValue(event.target.value)}
          className={styles.addImageInput}
          placeholder="Paste image url"
        />
      </div>
    </div>
  );
};
