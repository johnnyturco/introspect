import { useContext } from "react";
import NewPostForm from "../components/NewPostForm";
import { PostsContext } from "../context/PostsProvider";

function NewPost() {
  const { setPosts } = useContext(PostsContext);

  return (
    <container className="new-post">
      <h2>new post</h2>
      <NewPostForm setPosts={setPosts} pushHome={true} />
    </container>
  );
}

export default NewPost;
