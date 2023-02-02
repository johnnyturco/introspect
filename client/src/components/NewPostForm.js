import { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { TagsContext } from '../context/TagsProvider';


function NewPostForm({ setPosts }) {

  const [ errors, setErrors ] = useState([])

  let { user } = useContext(UserContext);
  let { tags, setTags } = useContext(TagsContext);

  const [ newPost, setNewPost ] = useState({
    post_text: "",
    mood: "",
    tag_id: 2
  })
  // console.log(newPost)

  function handleChange(e) {
    setNewPost((prevNewPost) => {
      return {
        ...prevNewPost, [e.target.name]: e.target.value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((newPostFromServer) => setPosts((prevPosts) => {
          return [
            ...prevPosts, newPostFromServer
          ]
        }))
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

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
            <select name="tag_id">
              <option value="tag">select a tag</option>
              {tags.map((tag) => (
                <option value={tag.tag_name} key={tag.tag_name}>{tag.tag_name}</option>
              ))}
            </select>
          </div>

          <button className="post-button" type="submit">post</button>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm;