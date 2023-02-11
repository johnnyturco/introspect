import { useRef, useState } from "react";
import { rootElement } from "..";
import { createPortal } from "react-dom";

function getInitialState(tags) {
  const tagNames = {};
  for (let tag of tags) {
    tagNames[tag.id] = tag.tag_name;
  }
  return tagNames;
}

function TagsEditDialog({ onClose, tags, setTags }) {
  // const [tagNames, setTagNames] = useState(() =>
  //   tags.reduce((acc, cv) => {
  //     return { ...acc, [cv.id]: cv.tag_name };
  //   }, {})
  // );
  const [tagNames, setTagNames] = useState(getInitialState(tags));
  /**
   * {
   *   1: 'red',
   *   2: 'blue',
   * }
   */

  const dialogRef = useRef();
  const backdropRef = useRef();

  function handleClose() {
    const animationPromise = new Promise((resolve) => {
      if (dialogRef.current) {
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

  function handleChange(e) {
    const id = e.target.name;
    const newName = e.target.value;
    setTagNames((prev) => {
      return {
        ...prev,
        [id]: newName,
      };
    });
  }

  function handleSubmit(e) {
    const updatedTags = Object.entries(tagNames).reduce(
      (acc, [id, tagName]) => {
        return [...acc, { id, tag_name: tagName }];
      },
      []
    );

    // filter out tags that might have been deleted by comparing against tags array

    // do POST with updatedTags
  }

  return createPortal(
    <div className="back-drop fade-in-fwd" ref={backdropRef}>
      <div className="dialog fade-in-fwd-up" ref={dialogRef}>
        <h4>edit tags</h4>

        {tags.map((tag) => (
          <form className="edit-tags-form" onSubmit={handleSubmit} key={tag.id}>
            <input
              type="text"
              name={tag.id}
              value={tagNames[tag.id]}
              onChange={handleChange}
            />
            <button type="submit" className="done-button"></button>
          </form>
        ))}

        <div className="dialog-buttons">
          <button className="secondary-button" onClick={handleClose}>
            done
          </button>
          {/* <button>save</button> */}
        </div>
      </div>
    </div>,
    rootElement
  );
}

export default TagsEditDialog;
