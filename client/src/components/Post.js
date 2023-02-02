

function Post({ post }) {


  return (
    <article className="card post">
      <div className="post-text">{post.post_text}</div>
      <div className="post-mood-tag">
        <div className="post-mood">feeling: {post.mood}</div>
        <div className="post-tag">orange</div>
      </div>
      <div className="post-datetime">{new Date(post.created_at).toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric'
      })}</div>
    </article>
  )
}

export default Post;