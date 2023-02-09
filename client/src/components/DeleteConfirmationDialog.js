import { useRef, useState, useContext } from "react";
import { rootElement } from "..";
import { createPortal } from "react-dom";

function DeleteConfirmationDialog({ onClose, onPostDelete, post }) {
  const dialogRef = useRef();
  const backdropRef = useRef();

  function handleClose() {
    const animationPromise = new Promise((resolve) => {
      if (dialogRef.current) {
        // trigger close animation
        dialogRef.current.classList.remove("fade-in-foward-up");
        dialogRef.current.classList.add("fade-out-down");
        backdropRef.current.classList.remove("fade-in-fwd");
        backdropRef.current.classList.add("fade-out");

        // remove element once animation is finished
        dialogRef.current.addEventListener("animationend", () => {
          onClose();
          resolve();
          console.log("a");
        });
      } else {
        onClose();
        resolve();
        console.log("b");
      }
    });

    return animationPromise;
  }

  async function handleDelete() {
    await handleClose();
    console.log("c");

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
    rootElement
  );
}

export default DeleteConfirmationDialog;
