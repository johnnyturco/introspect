import { useRef } from "react";
import { rootElement } from "..";
import { createPortal } from "react-dom";
import { Post } from "../types";

interface DeleteConfirmationDialogProps {
  onClose: () => void;
  onPostDelete: (id: number) => void;
  post: Post;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  onClose,
  onPostDelete,
  post,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

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

  async function handleDelete() {
    await handleClose();

    fetch(`/posts/${post.id}`, {
      method: "DELETE",
    });
    onPostDelete(post.id);
  }

  return createPortal(
    <div className="back-drop fade-in-fwd" ref={backdropRef}>
      <div className="dialog fade-in-fwd-up" ref={dialogRef}>
        <h4>confirm delete</h4>
        <div className="dialog-buttons">
          <button className="secondary-button" onClick={handleClose}>
            cancel
          </button>
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    </div>,
    rootElement!
  );
};

export default DeleteConfirmationDialog;
