import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef, useState } from "react";

import styles from "./ImageComponent.module.css";
import { Toolbar, ToolbarDivider } from "../../components/Toolbar";
import { Button } from "../../components/Button";
import { IconMoore, IconPen, IconTrash } from "../../components/icons";
import { AddImageBox } from "./AddImageBox";

export const ImageComponent = ({
  node: {
    attrs: { src, alt, title },
  },
  editor,
  updateAttributes,
  deleteNode,
}: NodeViewProps) => {
  const figcaptionInputRef = useRef<HTMLInputElement>(null);
  const [showFigCaption, setShowFigCaption] = useState(!!alt);
  const [showAddImageBox, setShowAddImageBox] = useState(!src);
  const [imgError, setImgError] = useState(false);
  const onCaptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateAttributes({
        src,
        alt: event.target.value,
        title,
      });
    },
    [src, title, updateAttributes],
  );
  const onCaptionKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        editor.chain().focus().run();
        return;
      }
    },
    [editor],
  );
  const onImgError = useCallback(() => {
    setImgError(true);
  }, []);

  return (
    <NodeViewWrapper className={styles.image}>
      <figure>
        <img
          src={
            imgError ? `https://placehold.co/600x300?text=Image+not+found` : src
          }
          alt={alt}
          title={title}
          data-drag-handle
          onError={onImgError}
        />
        {showFigCaption && !editor.isEditable && <figcaption>{alt}</figcaption>}
        {showFigCaption && editor.isEditable && (
          <input
            ref={figcaptionInputRef}
            className={styles.figcaptionInput}
            defaultValue={alt}
            placeholder="Write a caption"
            onChange={onCaptionChange}
            onKeyDown={onCaptionKeyDown}
          />
        )}
      </figure>

      {showAddImageBox && (
        <div className={styles.addImageBoxWrapper}>
          <AddImageBox
            src={src}
            close={() => setShowAddImageBox(false)}
            onAddImage={(imageUrl: string) => {
              setImgError(false);
              updateAttributes({ src: imageUrl, alt, title });
              setShowAddImageBox(false);
            }}
          />
        </div>
      )}

      {src && editor.isEditable && (
        <div className={styles.imageToolbar}>
          <Toolbar>
            <Button
              className={styles.toolbarBtn}
              onClick={() => {
                setShowAddImageBox(true);
              }}
            >
              Edit url
            </Button>
            <ToolbarDivider />
            <Button
              className={styles.toolbarBtn}
              onClick={() => {
                if (showFigCaption) {
                  setShowFigCaption(false);
                  updateAttributes({ src, alt: "", title });
                } else {
                  setShowFigCaption(true);
                  setTimeout(() => {
                    figcaptionInputRef.current?.focus();
                  }, 0);
                }
              }}
            >
              {showFigCaption ? <IconTrash /> : <IconPen />}
              Caption
            </Button>
            <ToolbarDivider />

            <Button className={styles.toolbarBtn} onClick={() => deleteNode()}>
              Remove
            </Button>
            <ToolbarDivider />
            <Button
              className={styles.toolbarBtn}
              onClick={() => {
                /* mock fn */
              }}
              disabled={true}
            >
              <IconMoore />
            </Button>
          </Toolbar>
        </div>
      )}
    </NodeViewWrapper>
  );
};
