// React specific imports
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Editor specific imports
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Socket service to receive and emit events
import { socket } from "../services/event_service.js";

import { nanoid } from "nanoid";

export default function Editor() {
  const [editorContent, setEditorContent] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const socketIdRef = useRef();
  const nodeIdsRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie;
    const token_cookie = cookies
      .split(";")
      .filter((cookie) => cookie.includes("token"))[0]
      ?.split("=")[1];
    if (!token_cookie) {
      navigate("/");
      setIsAuth(false);
    } else {
      setIsAuth(true);
      nodeIdsRef.current = [];
    }
  }, []);

  // First time component call, set up the socket
  useEffect(() => {
    socket.connect();

    function onConnect(data) {
      socket.emit("connection-success", "connection is successful!");
      console.log("Connected to server socket...");
      socketIdRef.current = data.socket_id;
    }
    socket.on("connected", onConnect);
    socket.on("insert-synced", syncInsertInEditor);
    socket.on("delete-synced", syncDeleteInEditor);
    socket.on("image-synced", syncImageInEditor);
    socket.on("style-synced", syncStyleInEditor);
  }, [isAuth]);

  // Handle the edit in the editor
  function handleEdit(htmlContent, delta, user, editor) {
    /*
      Delta: specifies the change. It can contain retain and insert/delete operations. Retain means how many characters to keep, insert means the characters inserted, if any style is applied then it will also contain retain that will tell how many characters to keep and apply style on them. Delete contains only number of characters deleted.
    */
    console.log(delta);

    // Seperate the retain (optional) and insert/delete from delta
    const ops = delta.ops.filter(
      (op) => op.insert || op.delete || op.attributes
    );
    const retain = delta.ops.filter((op) => op.retain);
    const index = retain[0]?.retain || 0;

    if (ops[0].attributes) {
      let prevNodeId = getNodeId(index);
      let timeStamp = Date.now();

      socket.emit("style", {
        retain: index,
        style: ops[0].attributes || {},
        prev_node_id: prevNodeId,
        timestamp: timeStamp,
      });
    } else if (ops[0]?.insert?.image) {
      let nodeId = nanoid();
      nodeIdsRef.current.splice(index + 1, 0, nodeId);
      let prevNodeId = getNodeId(index);
      let timeStamp = Date.now();

      socket.emit("image", {
        retain: index,
        data: ops[0].insert.image,
        style: ops[0].insert.attributes || {},
        node_id: nodeId,
        prev_node_id: prevNodeId,
        timestamp: timeStamp,
      });
    } else if (ops[0].insert) {
      ops[0].insert.split("").map((insert, i) => {
        let nodeId = nanoid();
        let prevNodeId = getNodeId(index + i);
        nodeIdsRef.current.splice(index + i + 1, 0, nodeId);
        let timeStamp = Date.now();
        socket.emit("insert", {
          retain: index + i,
          data: insert,
          style: ops[0].attributes || {},
          node_id: nodeId,
          prev_node_id: prevNodeId,
          timestamp: timeStamp,
        });
      });
    } else if (ops[0].delete) {
      socket.emit("delete", {
        retain: index,
        data: ops[0].delete,
        prev_node_id: prevNodeId,
        timestamp: timeStamp,
      });
    }

    setEditorContent(htmlContent);
  }

  function getNodeId(index) {
    return index ? nodeIdsRef.current[index] : undefined;
  }

  function syncInsertInEditor(data) {
    if (data.socket_id !== socketIdRef.current) {
    }
  }

  function syncDeleteInEditor(data) {
    if (data.socketId !== socketIdRef.current) {
    }
  }

  function syncImageInEditor(data) {
    if (data.socketId !== socketIdRef.current) {
    }
  }

  function syncStyleInEditor(data) {
    if (data.socketId !== socketIdRef.current) {
    }
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
          <ReactQuill
            modules={modulesRef}
            theme={"snow"}
            onChange={handleEdit}
            value={editorContent}
          />
        </div>
      </main>
    </>
  );
}

function generateNodeId() {}

function prevNodeId() {}

function nextNodeId() {}
