import React, { useEffect } from "react";
import "./App.css";
import { Editor } from "./feature/Editor";
import { htmlToMarkdown } from "./utils/htmlToMarkdown";

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
    if (savedHtml) {
      console.log("savedHtml", savedHtml);
      setHtml(savedHtml);
    }
    const savedMd = getItem(STORAGE_KEYS.md);
    if (savedMd) {
      setMarkdown(savedMd);
    }
  }, []);

  return (
    <div className="App">
      <div>
        <Editor
          editable={isEditMode}
          content={html}
          onUpdate={(html) => {
            setItem(STORAGE_KEYS.html, html);
            if (textareaMdOutputRef.current) {
              textareaMdOutputRef.current.value = htmlToMarkdown(html);
            }
          }}
        />
        <label>
          output markdown
          <textarea
            ref={textareaMdOutputRef}
            className="markdown-output"
            readOnly
            rows={10}
          />
        </label>
      </div>
      <div>
        <label>
          Markdown to HTML
          <textarea
            className="markdown-input"
            value={markdown}
            rows={10}
            onChange={(e) => {
              setMarkdown(e.target.value);
              setItem(STORAGE_KEYS.md, e.target.value);
            }}
          />
        </label>
        <Editor editable={false} content={markdown} />
      </div>
    </div>
  );
}

export default App;
