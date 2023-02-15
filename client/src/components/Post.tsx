import { useState, Dispatch, SetStateAction } from "react";
import EditPostDialog from "./EditPostDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { Post as PostType } from "../types";
import { ReactComponent as TagIcon } from "../svg/tag_icon.svg";

interface PostProps {
  post: PostType;
  posts: PostType[];
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  isTag?: boolean;
}

const Post: React.FC<PostProps> = ({ post, posts, setPosts, isTag }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function handlePostDelete(id: number) {
    const updatedPosts = posts.filter((onePost) => onePost.id !== id);
    setPosts(updatedPosts);
  }

  return (
    <div className="card-container">
      <article className="card post fade-in-fwd-up">
        <div className="post-text">{post.post_text}</div>
        <div className="post-mood-tag">
          {post.mood ? (
            <div className="post-mood">
              <span>MOOD</span> {post.mood}
            </div>
          ) : (
            ""
          )}
          {isTag && post.tag ? (
            <div className="post-tag">
              <TagIcon />
              {post.tag.tag_name}
            </div>
          ) : (
            ""
          )}
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
            ></button>
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
            onPostDelete={handlePostDelete}
            post={post}
          />
        ) : null}
      </article>
    </div>
  );
};

export default Post;
