import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useNavigate } from "react-router-dom";
import { UserService } from "../service/user_service.js";

export default function Editor() {
  const navigate = useNavigate();

  // Check user authentication with token
  if (~UserService.hasToken()) {
    navigate("/");
  }

  // Toolbar options for the editor
  const modulesRef = {
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
  };

  return (
    <>
      <header>
        <h1>Collaborate and Write Blogs.</h1>
      </header>
      <main>
        <div id="editor">
          <ReactQuill modules={modulesRef} theme={"snow"} />
        </div>
      </main>
    </>
  );
}
