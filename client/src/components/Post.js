import { useState } from "react";
import EditPostDialog from "./EditPostDialog";

function Post({ post, setPosts, isTag }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <article className="card post">
      <div className="post-text">{post.post_text}</div>
      <div className="post-mood-tag">
        <div className="post-mood">{post.mood}</div>
        {/* {isTag ? <div className="post-tag">{post.tag.tag_name}</div> : ""} */}
        <div className="post-tag">{post.tag.tag_name}</div>
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
        <div>
          <button
            type="button"
            className="secondary-button edit-button"
            onClick={() => setIsEditOpen(true)}
          >
            edit
          </button>
        </div>
      </div>
      {isEditOpen ? (
        <EditPostDialog
          onClose={() => setIsEditOpen(false)}
          post={post}
          setPosts={setPosts}
        />
      ) : null}
    </article>
  );
}

export default Post;
