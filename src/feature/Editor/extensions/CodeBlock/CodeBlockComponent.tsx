import {
  NodeViewContent,
  NodeViewRendererProps,
  NodeViewWrapper,
} from "@tiptap/react";
import "highlight.js/styles/github.css";

import styles from "./CodeBlockComponent.module.css";

export const CodeBlockComponent = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  extension,
  editor,
}: NodeViewRendererProps) => {
  return (
    <NodeViewWrapper className={styles.codeBlock}>
      <pre>
        <NodeViewContent as="code" />
      </pre>
      <select
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
    </NodeViewWrapper>
  );
};
