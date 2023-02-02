import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { TagsContext } from "../context/TagsProvider";

const defaultPost = {
  post_text: "",
  mood: "select",
  tag_id: "select",
};

function NewPostForm({ setPosts, pushHome }) {
  const [errors, setErrors] = useState([]);

  let { user } = useContext(UserContext);
  let { tags, setTags } = useContext(TagsContext);

  let history = useHistory();

  const [newPost, setNewPost] = useState(defaultPost);
  // console.log(newPost)

  function handleChange(e) {
    setNewPost((prevNewPost) => {
      return {
        ...prevNewPost,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newPostFromServer) =>
          setPosts((prevPosts) => {
            return [...prevPosts, newPostFromServer];
          })
        );
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    setNewPost(defaultPost);
  }

  // function handlePushHome() {
  //   if (pushHome) {
  //     history.push("/timeline");
  //   }
  // }

  return (
    <div>
      <form className="card post-form" onSubmit={handleSubmit}>
        <textarea
          name="post_text"
          placeholder="new post…"
          value={newPost.post_text}
          onChange={handleChange}
        />
        <div className="post-form-bottom">
          <div>
            <select name="mood" onChange={handleChange}>
              <option value="select">select a mood</option>
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
            <select name="tag_id" onChange={handleChange}>
              <option value="select">select a tag</option>
              {tags & user ? (
                tags.map((tag) => (
                  <option value={tag.id} key={tag.id}>
                    {tag.tag_name}
                  </option>
                ))
              ) : (
                <option value="loading">loading…</option>
              )}
            </select>
          </div>

          <button className="new-tag-button">new tag</button>

          <button
            className="post-button"
            type="submit"
            // onClick={handlePushHome}
          >
            post
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPostForm;
