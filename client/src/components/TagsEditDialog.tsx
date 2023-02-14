import { useRef } from "react";
import { rootElement } from "..";
import { createPortal } from "react-dom";
import EditTagRow from "./EditTagRow";
import { TagWithPosts } from "../types";

interface TagsEditDialogProps {
  onClose: () => void;
  tags: TagWithPosts[];
}

const TagsEditDialog: React.FC<TagsEditDialogProps> = ({ onClose, tags }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  function handleClose() {
    const animationPromise = new Promise<void>((resolve) => {
      if (dialogRef.current && backdropRef.current) {
        dialogRef.current.classList.remove("fade-in-foward-up");
        dialogRef.current.classList.add("fade-out-down");
        backdropRef.current.classList.remove("fade-in-fwd");
        backdropRef.current.classList.add("fade-out");

        dialogRef.current.addEventListener("animationend", () => {
          onClose();
          resolve();
        });
      } else {
        onClose();
        resolve();
      }
    });

    return animationPromise;
  }

  return createPortal(
    <div className="back-drop fade-in-fwd" ref={backdropRef}>
      <div className="dialog fade-in-fwd-up" ref={dialogRef}>
        <h4>edit tags</h4>

        {tags.map((tag) => (
          <EditTagRow key={tag.id} tag={tag} />
        ))}

        <div className="dialog-buttons" id="tag-done-button">
          <button onClick={handleClose}>done</button>
        </div>
      </div>
    </div>,
    rootElement!
  );
};

export default TagsEditDialog;
