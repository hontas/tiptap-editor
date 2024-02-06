import { useRef } from "react";
import {
  NodeViewContent,
  NodeViewRendererProps,
  NodeViewWrapper,
} from "@tiptap/react";

import styles from "./CodeBlockComponent.module.css";

export const CodeBlockComponent = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  extension,
  editor,
}: NodeViewRendererProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <NodeViewWrapper className={styles.codeBlock}>
      <pre>
        <NodeViewContent as="code" />
      </pre>
      <div className={styles.select}>
        <select
          style={{
            width: getCharacterWidth(
              selectRef.current?.value || defaultLanguage,
            ),
          }}
          ref={selectRef}
          contentEditable={false}
          defaultValue={defaultLanguage}
          onChange={(event) =>
            editor
              .chain()
              .focus()
              .updateAttributes("codeBlock", { language: event.target.value })
              .run()
          }
        >
          <option value="null">auto</option>
          <option disabled>—</option>
          {extension.options.lowlight
            .listLanguages()
            .map((lang: string, index: number) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
        </select>
        <span className={styles.focusRing} />
      </div>
    </NodeViewWrapper>
  );
};

const magicalNumber = 1.6;
function getCharacterWidth(text: string) {
  const input = text === "null" ? "auto" : text;
  const wideChars = (input.match(/[mw]/g) || []).length * 0.5;
  const semiNarrowChars = (input.match(/[r]/g) || []).length * 0.4;
  const narrowChars = (input.match(/[ fijlt]/g) || []).length * 0.4;
  const width = Math.max(
    input.length - narrowChars - semiNarrowChars + wideChars + magicalNumber,
    4,
  );
  return `${width}ch`;
}
