import React from "react";
import "./App.css";
import { Editor } from "./feature/Editor";
import { htmlToMarkdown } from "./utils/htmlToMarkdown";
import { markdownToHtml } from "./utils/markdownToHtml";
import { ErrorBoundary } from "./components/ErrorBoundary";

// const STORAGE_KEYS = {
//   html: "tiptap-html",
//   md: "tiptap-markdown",
// };

// const setItem = (key: string, value: string) => {
//   localStorage.setItem(key, value);
// };
// const getItem = (key: string) => {
//   return localStorage.getItem(key);
// };

function App() {
  const textareaMdOutputRef = React.useRef<HTMLTextAreaElement>(null);
  // const [html, setHtml] = React.useState("");
  const [markdown, setMarkdown] = React.useState("");

  // useEffect(() => {
  //   const savedHtml = getItem(STORAGE_KEYS.html);
  //   const savedMd = getItem(STORAGE_KEYS.md);

  //   if (savedHtml) setHtml(savedHtml);
  //   if (savedMd) {
  //     markdownToHtml(savedMd).then((vFile) => {
  //       setMarkdown(vFile.toString());
  //     });
  //   }
  // }, []);

  return (
    <div className="App">
      <h1>Tiptap editor</h1>

      <div className="columns">
        <div>
          <h2>To markdown</h2>
          <ErrorBoundary name={"editable Editor"}>
            <Editor
              editable
              // content={html}
              onUpdate={(html) => {
                if (html !== "<p></p>") {
                  // setItem(STORAGE_KEYS.html, html);
                  if (textareaMdOutputRef.current) {
                    textareaMdOutputRef.current.value = htmlToMarkdown(html);
                  }
                }
              }}
            />
          </ErrorBoundary>
          <h3>Markdown output</h3>

          <textarea
            ref={textareaMdOutputRef}
            className="markdown-output"
            readOnly
            rows={10}
          />
        </div>
        <div>
          <h2>From markdown</h2>
          <textarea
            className="markdown-input"
            // value={markdown}
            rows={10}
            onChange={(e) => {
              setMarkdown(e.target.value);
              markdownToHtml(e.target.value).then((vFile) =>
                setMarkdown(vFile.toString()),
              );

              // setItem(STORAGE_KEYS.md, e.target.value);
            }}
          />
          <h3>Rendered as HTML in editor</h3>
          <ErrorBoundary name={"uneditable Editor"}>
            <Editor editable={false} content={markdown} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default App;
