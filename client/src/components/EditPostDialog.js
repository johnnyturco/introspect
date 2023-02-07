import { useState, useContext } from "react";
import { rootElement } from "..";
import { createPortal } from "react-dom";
import { TagsContext } from "../context/TagsProvider";

function EditPostDialog({ onClose, post, posts, setPosts }) {
  const [errors, setErrors] = useState([]);

  const { tags, setTags } = useContext(TagsContext);

  const [editPost, setEditPost] = useState({
    post_text: post.post_text,
    mood: post.mood,
    tag_name: post.tag.tag_name,
  });

  function handleChange(e) {
    setEditPost((prevPost) => {
      return {
        ...prevPost,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleUpdateRender(updatedPostFromServer) {
    setPosts(posts.filter((post) => post.id !== updatedPostFromServer.id));
    setPosts((prevPosts) => {
      return [...prevPosts, updatedPostFromServer];
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
          handleUpdateRender(updatedPostFromServer)
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
