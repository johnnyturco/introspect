import { useContext, useState } from "react";
import { TagsContext } from "../context/TagsProvider";
import { TagWithPosts } from "../types";

interface EditTagRowProps {
  tag: TagWithPosts;
}

const EditTagRow: React.FC<EditTagRowProps> = ({ tag }) => {
  const [errors, setErrors] = useState([]);
  const [tagName, setTagName] = useState(tag.tag_name);
  const [isEditing, setIsEditing] = useState(false);

  const { tags, setTags } = useContext(TagsContext);

  function handleDelete() {
    fetch(`/tags/${tag.id}`, {
      method: "DELETE",
    });

    const updatedTags = tags.filter((oneTag) => oneTag.id !== tag.id);
    setTags(updatedTags);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetch(`/tags/${tag.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag_name: tagName }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedTag) => {
          const updatedTagsList = tags.map((oneTag) => {
            if (oneTag.id === tag.id) {
              return updatedTag;
            } else {
              return oneTag;
            }
          });
          setTags(updatedTagsList);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });

    setIsEditing(false);
  }

  return isEditing ? (
    <form className="edit-tags-form" onSubmit={handleSubmit}>
      <input
        className="edit-tag-input"
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        autoFocus
      />
      <button type="submit" className="done-button"></button>
      <button
        type="button"
        className="secondary-button close-button"
        onClick={() => setIsEditing(false)}
      ></button>

      {errors.length ? (
        <div>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      ) : null}
    </form>
  ) : (
    <article className="edit-tag-row">
      <div className="tag-text">{tag.tag_name}</div>
      <button
        type="button"
        className="secondary-button edit-button"
        onClick={() => setIsEditing(true)}
      ></button>
      <button
        type="button"
        className="secondary-button delete-button"
        onClick={handleDelete}
      ></button>
    </article>
  );
};

export default EditTagRow;
