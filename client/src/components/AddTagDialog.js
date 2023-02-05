import { useState } from "react";
import { rootElement } from "..";
import { createPortal } from "react-dom";

function AddTagDialog({ onClose, setTags }) {
  const [tagName, setTagName] = useState("");

  function handleAddTag() {
    onClose();

    fetch(`/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag_name: tagName,
      }),
    })
      .then((r) => r.json())
      .then((newTagFromServer) =>
        setTags((prevTags) => {
          return [...prevTags, newTagFromServer];
        })
      );
  }

  return createPortal(
    <div className="back-drop">
      <div className="dialog">
        <h4>add tag</h4>
        <input
          type="text"
          name="tag"
          placeholder="tag…"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          autoFocus
        />
        <div className="dialog-buttons">
          <button className="secondary-button" onClick={onClose}>
            cancel
          </button>
          <button onClick={handleAddTag}>add</button>
        </div>
      </div>
    </div>,
    rootElement
  );
}

export default AddTagDialog;
