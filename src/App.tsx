import React, { useEffect } from "react";
import "./App.css";
import { Editor } from "./feature/Editor";
import { htmlToMarkdown } from "./utils/htmlToMarkdown";
import { markdownToHtml } from "./utils/markdownToHtml";
import { ErrorBoundary } from "./components/ErrorBoundary";

const STORAGE_KEYS = {
  html: "tiptap-html",
  md: "tiptap-markdown",
};

const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
const getItem = (key: string) => {
  return localStorage.getItem(key);
};

function App() {
  const textareaMdOutputRef = React.useRef<HTMLTextAreaElement>(null);
  const [isEditMode, setEditMode] = React.useState(true);
  const [html, setHtml] = React.useState("");
  const [markdown, setMarkdown] = React.useState("");

  useEffect(() => {
    const savedHtml = getItem(STORAGE_KEYS.html);
    const savedMd = getItem(STORAGE_KEYS.md);

    if (savedHtml) setHtml(savedHtml);
    if (savedMd) {
      markdownToHtml(savedMd).then((vFile) => {
        setMarkdown(vFile.toString());
      });
    }
  }, []);

  return (
    <div className="App">
      <div>
        <label>
          <input
            type="checkbox"
            checked={isEditMode}
            onChange={() => setEditMode((prev) => !prev)}
          />
          editable
        </label>
        <ErrorBoundary name={"editable Editor"}>
          <Editor
            editable={isEditMode}
            content={html}
            onUpdate={(html) => {
              console.log("editable editor update", html);
              setItem(STORAGE_KEYS.html, html);
              if (textareaMdOutputRef.current) {
                textareaMdOutputRef.current.value = htmlToMarkdown(html);
              }
            }}
          />
        </ErrorBoundary>
        <h3>Output markdown</h3>
        <textarea
          ref={textareaMdOutputRef}
          className="markdown-output"
          readOnly
          rows={10}
        />
      </div>
      <div>
        <textarea
          className="markdown-input"
          value={markdown}
          rows={10}
          onChange={(e) => {
            setMarkdown(e.target.value);
            setItem(STORAGE_KEYS.md, e.target.value);
          }}
        />
        <h3>Markdown to HTML</h3>
        <ErrorBoundary name={"uneditable Editor"}>
          <Editor editable={false} content={markdown} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
