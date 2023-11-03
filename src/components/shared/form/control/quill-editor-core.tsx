// import CodeMirror from "@uiw/react-codemirror";
import { uploadFile } from "@/client/util";
import React, { useMemo } from "react";
import ReactQuill from "react-quill";

interface IQuillEditorCoreProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const QuillEditorCore = ({ value, onChange, placeholder }: IQuillEditorCoreProps) => {
  const quillRef = React.useRef<ReactQuill>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      try {
        const file = input.files?.[0];
        if (!file) throw new Error("file is null");

        const result = await uploadFile(file);
        console.log(result);
        const IMG_URL = result.url;

        const editor = quillRef.current?.getEditor();
        if (!editor) throw new Error("editor is null");

        const range = editor.getSelection();
        if (!range) throw new Error("range is null");

        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default QuillEditorCore;
