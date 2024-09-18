import Editor from "@monaco-editor/react";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { useState } from "react";

export default function CodeEditor({
  handlehtml,
  handleCSS,
  htmlValue,
  cssValue,
  inCreateBtn,
  inEdit,
}) {
  const [isCopied, setIsCopied] = useState(false);
  function handleEditHtml(value) {
    handlehtml(value);
  }
  function handleEditCSS(value) {
    handleCSS(value);
  }
  function handleCopy() {
    const fullCode = `<!-- HTML Code -->\n${htmlValue}\n\n/* CSS Code */\n${cssValue}`;
    navigator.clipboard.writeText(fullCode).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  }

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="flex-grow mb-2">
        <span className="bg-dark p-1 rounded ml-1 flex justify-between items-center">
          Html
          <button onClick={handleCopy} className="ml-5 flex items-center">
            {isCopied ? (
              <FaCheck size={15} />
            ) : (
              <FaRegCopy size={15} /> // Copy icon with red color
            )}
            <span className="ml-2 text-sm">
              {isCopied ? "Copied!" : "Copy"}
            </span>
          </button>
        </span>
        <Editor
          height="33vh"
          defaultLanguage="html"
          defaultValue="// HTML Code"
          theme="vs-dark"
          onChange={handleEditHtml}
          value={htmlValue}
          options={{
            readOnly: inCreateBtn || inEdit ? false : true,
          }}
        />
      </div>
      <div className="flex-grow">
        <span className="bg-dark p-1 rounded ml-1">CSS</span>
        <Editor
          height="33vh"
          defaultLanguage="css"
          defaultValue="/* CSS code */"
          theme="vs-dark"
          value={cssValue}
          onChange={handleEditCSS}
          options={{
            readOnly: inCreateBtn || inEdit ? false : true,
          }}
        />
      </div>
    </div>
  );
}
