// React specific imports
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Editor specific imports
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Collaborative editing
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { QuillBinding } from "y-quill";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);

export default function Editor() {
  const navigate = useNavigate();

  const cookies = document.cookie;
  const token_cookie = cookies
    .split(";")
    .filter((cookie) => cookie.includes("token"))[0]
    ?.split("=")[1];
  if (!token_cookie) {
    navigate("/");
  }

  useEffect(() => {
    const quill = new Quill(document.querySelector("#editor"), {
      modules: {
        cursors: true,
        toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ script: "sub" }, { script: "super" }],
          [{ direction: "rtl" }],
          [{ color: [] }, { background: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ align: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      },
      placeholder: "Compose a blog here...",
      theme: "snow", // or 'bubble'
    });

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider("quill-demo-room", ydoc, {
      signaling: ["ws://localhost:4444"],
    });
    const ytext = ydoc.getText("quill");
    new QuillBinding(ytext, quill, provider.awareness);
  }, []);

  return (
    <>
      <header>
        <h1>Collaborate and Write Blogs.</h1>
      </header>
      <main>
        <div id="editor"></div>
      </main>
    </>
  );
}
