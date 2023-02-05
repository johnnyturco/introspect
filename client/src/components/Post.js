function Post({ post, isTag }) {
  return (
    <article className="card post">
      <div className="post-text">{post.post_text}</div>
      <div className="post-mood-tag">
        <div className="post-mood">{post.mood}</div>
        {isTag ? <div className="post-tag">{post.tag.tag_name}</div> : ""}
      </div>
      <div className="post-datetime">
        {new Date(post.created_at).toLocaleString("en-US", {
          day: "numeric",
          year: "numeric",
          month: "short",
          hour: "numeric",
          minute: "numeric",
        })}
      </div>
    </article>
  );
}

export default Post;
