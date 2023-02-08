import { useState } from "react";
import EditPostDialog from "./EditPostDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

function Post({ post, posts, setPosts, isTag, onPostDelete }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="card-container">
      <article className="card post fade-in-fwd-up">
        <div className="post-text">{post.post_text}</div>
        <div className="post-mood-tag">
          <div className="post-mood">{post.mood}</div>
          {isTag ? <div className="post-tag">{post.tag.tag_name}</div> : ""}
        </div>
        <div className="post-bottom">
          <div className="post-datetime">
            {new Date(post.created_at).toLocaleString("en-US", {
              day: "numeric",
              year: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
          <div className="post-bottom-buttons">
            <button
              type="button"
              className="secondary-button edit-button"
              onClick={() => setIsEditOpen(true)}
            >
              edit
            </button>
            <button
              type="button"
              className="secondary-button delete-button"
              onClick={() => setIsDeleteOpen(true)}
            ></button>
          </div>
        </div>
        {isEditOpen ? (
          <EditPostDialog
            onClose={() => setIsEditOpen(false)}
            post={post}
            setPosts={setPosts}
          />
        ) : null}
        {isDeleteOpen ? (
          <DeleteConfirmationDialog
            onClose={() => setIsDeleteOpen(false)}
            onPostDelete={onPostDelete}
            post={post}
          />
        ) : null}
      </article>
    </div>
  );
}

export default Post;
