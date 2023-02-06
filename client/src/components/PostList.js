import { useContext, useMemo } from "react";
import { PostsContext } from "../context/PostsProvider";
import Post from "./Post";
import NewPostForm from "./NewPostForm";

function PostList() {
  const { posts, setPosts } = useContext(PostsContext);

  const sorted = useMemo(
    () =>
      posts
        ?.slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [posts]
  );

  return (
    <>
      <section>
        <NewPostForm setPosts={setPosts} />
      </section>
      <h2>timeline</h2>
      <section>
        {posts
          ? sorted.map((post) => (
              <Post
                key={post.id}
                post={post}
                setPosts={setPosts}
                isTag={true}
              />
            ))
          : null}
      </section>
    </>
  );
}

export default PostList;
