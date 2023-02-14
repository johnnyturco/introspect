import { useRef, useState, useContext, Dispatch, SetStateAction } from "react";
import { rootElement } from "..";
import { createPortal } from "react-dom";
import { TagsContext } from "../context/TagsProvider";
import { Post } from "../types";

interface EditPostDialogProps {
  onClose: () => void;
  post: Post;
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({
  onClose,
  post,
  setPosts,
}) => {
  const [errors, setErrors] = useState([]);

  const { tags } = useContext(TagsContext);

  const [editPost, setEditPost] = useState({
    post_text: post.post_text,
    mood: post.mood,
    tag_name: post.tag.tag_name,
  });

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

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setEditPost((prevPost) => {
      return {
        ...prevPost,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleUpdateRender(updatedPostFromServer: Post) {
    setPosts((prev) => {
      const filtered = prev.filter(
        (post) => post.id !== updatedPostFromServer.id
      );
      return [...filtered, updatedPostFromServer];
    });
  }

  function handleUpdatePost(e: React.FormEvent) {
    e.preventDefault();
    handleClose();

    fetch(`/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPost),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedPostFromServer) =>
          handleUpdateRender(updatedPostFromServer)
        );
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return createPortal(
    <div className="back-drop fade-in-fwd" ref={backdropRef}>
      <div className="dialog fade-in-fwd-up" ref={dialogRef}>
        <h4>edit post</h4>
        <textarea
          name="post_text"
          value={editPost.post_text}
          onChange={handleChange}
        />
        <div className="edit-form-bottom">
          <div>
            <select
              name="mood"
              defaultValue={post.mood}
              onChange={handleChange}
            >
              <option value="happy">happy</option>
              <option value="sad">sad</option>
              <option value="surprised">surprised</option>
              <option value="fearful">fearful</option>
              <option value="angry">angry</option>
              <option value="disgusted">disgusted</option>
              <option value="other">other</option>
            </select>
          </div>

          <div>
            <select
              name="tag_id"
              defaultValue={post.tag.id}
              onChange={handleChange}
            >
              {tags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.tag_name}
                </option>
              ))}
            </select>
          </div>

          <button className="secondary-button" onClick={handleClose}>
            cancel
          </button>

          <button onClick={handleUpdatePost}>update</button>
        </div>
      </div>
      {errors.length ? (
        <div>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      ) : null}
    </div>,
    rootElement!
  );
};

export default EditPostDialog;
