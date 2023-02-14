import { useContext } from "react";
import { PostsContext } from "../context/PostsProvider";
import { TagWithPosts } from "../types";
import Post from "./Post";

interface TagCategoryProps {
  tag: TagWithPosts;
}

const TagCategory: React.FC<TagCategoryProps> = ({ tag }) => {
  const { posts, setPosts } = useContext(PostsContext);

  const tagPosts = tag.posts.map((post) => (
    <Post key={post.id} post={post} posts={posts} setPosts={setPosts} />
  ));

  return <>{tagPosts}</>;
};

export default TagCategory;
