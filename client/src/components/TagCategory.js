import Post from "./Post";

function TagCategory({ tag }) {
  const tagPosts = tag.posts.map((post) => <Post post={post} key={post.id} />);

  return (
    <>
      {/* <h3>{tag.tag_name}</h3> */}
      {tagPosts}
    </>
  );
}

export default TagCategory;
