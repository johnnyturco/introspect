import { useState, useContext } from "react";
import { rootElement } from "..";
import { createPortal } from "react-dom";

function EditPostDialog({ onClose, post, setPosts }) {
  const [errors, setErrors] = useState([]);

  const [editPost, setEditPost] = useState({
    post_text: post.post_text,
    mood: post.mood,
    tag_name: post.tag_name,
  });

  function handleChange(e) {
    setEditPost((prevPost) => {
      return {
        ...prevPost,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleUpdatePost(e) {
    e.preventDefault();

    fetch(`/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPost),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedPostFromServer) =>
          setPosts((prevPosts) => {
            return [...prevPosts, updatedPostFromServer];
          })
        );
        onClose();
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return createPortal(
    <div className="back-drop">
      <div className="dialog">
        <h4>edit post</h4>
        <textarea
          name="post_text"
          value={editPost.post_text}
          onChange={handleChange}
        />
        <div className="edit-form-bottom">
          <div>
            <select name="mood" onChange={handleChange}>
              <option value="test-mood">test mood</option>
            </select>
          </div>

          <div>
            <select name="tag_id" onChange={handleChange}>
              <option value="test-tag">test tag</option>
            </select>
          </div>

          <button className="secondary-button" onClick={onClose}>
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
    rootElement
  );
}

export default EditPostDialog;
