import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { TagsContext } from "../context/TagsProvider";
import AddTagDialog from "./AddTagDialog";

function NewPostForm({ setPosts, pushHome }) {
  const [errors, setErrors] = useState([]);

  const { user } = useContext(UserContext);
  const { tags, setTags } = useContext(TagsContext);

  const history = useHistory();

  const [newPost, setNewPost] = useState({
    post_text: "",
    mood: "",
    tag_id: "",
  });

  const [isAddTagOpen, setIsAddTagOpen] = useState(false);

  function handleChange(e) {
    setNewPost((prevNewPost) => {
      return {
        ...prevNewPost,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const r = await fetch(`/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    if (r.ok) {
      const newPostFromServer = await r.json();
      setPosts((prevPosts) => {
        return [...prevPosts, newPostFromServer];
      });
    } else {
      const err = await r.json();
      setErrors(err.errors);
    }
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
            <select
              name="mood"
              defaultValue={"default"}
              onChange={handleChange}
            >
              <option value="default" disabled>
                mood
              </option>
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
              defaultValue={"default"}
              onChange={handleChange}
            >
              <option value="default" disabled>
                tag
              </option>
              {tags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.tag_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => setIsAddTagOpen(true)}
          >
            new tag
          </button>

          <button
            className="post-button"
            type="submit"
            // onClick={handlePushHome}
          >
            post
          </button>
        </div>
      </form>
      {isAddTagOpen ? (
        <AddTagDialog
          onClose={() => setIsAddTagOpen(false)}
          setTags={setTags}
        />
      ) : null}
      {errors.length ? (
        <div>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default NewPostForm;
