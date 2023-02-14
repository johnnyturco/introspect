import { useRef, useState, Dispatch, SetStateAction } from "react";
import { rootElement } from "..";
import { createPortal } from "react-dom";
import { TagWithPosts } from "../types";

interface AddTagDialogProps {
  onClose: () => void;
  setTags: Dispatch<SetStateAction<TagWithPosts[]>>;
}

const AddTagDialog: React.FC<AddTagDialogProps> = ({ onClose, setTags }) => {
  const [tagName, setTagName] = useState("");
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  function handleClose() {
    if (dialogRef.current && backdropRef.current) {
      dialogRef.current.classList.remove("fade-in-foward-up");
      dialogRef.current.classList.add("fade-out-down");
      backdropRef.current.classList.remove("fade-in-fwd");
      backdropRef.current.classList.add("fade-out");

      dialogRef.current.addEventListener("animationend", () => {
        onClose();
      });
    } else {
      onClose();
    }
  }

  function handleAddTag() {
    handleClose();

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
    <div className="back-drop fade-in-fwd" ref={backdropRef}>
      <div className="dialog fade-in-fwd-up" ref={dialogRef}>
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
          <button className="secondary-button" onClick={handleClose}>
            cancel
          </button>
          <button onClick={handleAddTag}>add</button>
        </div>
      </div>
    </div>,
    rootElement!
  );
};

export default AddTagDialog;
