import { useContext, useMemo, useState } from "react";
import { PostsContext } from "../context/PostsProvider";
import Post from "./Post";
import NewPostForm from "./NewPostForm";
import { subDays, subMonths, isWithinInterval } from "date-fns";

function PostList() {
  const [selectedSort, setSelectedSort] = useState("descending");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { posts, setPosts } = useContext(PostsContext);

  const sorted = useMemo(() => {
    return posts
      ?.slice()
      .filter((post) => {
        if (selectedFilter === "day") {
          return isWithinInterval(new Date(post.created_at), {
            start: subDays(new Date(), 1),
            end: new Date(),
          });
        } else if (selectedFilter === "week") {
          return isWithinInterval(new Date(post.created_at), {
            start: subDays(new Date(), 7),
            end: new Date(),
          });
        } else if (selectedFilter === "month") {
          return isWithinInterval(new Date(post.created_at), {
            start: subMonths(new Date(), 1),
            end: new Date(),
          });
        } else {
          return post;
        }
      })
      .sort((a, b) =>
        selectedSort === "descending"
          ? new Date(b.created_at) - new Date(a.created_at)
          : new Date(a.created_at) - new Date(b.created_at)
      );
  }, [posts, selectedSort, selectedFilter]);

  // ***************************

  function handlePostDelete(id) {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  }

  // ***************************

  return (
    <>
      <section>
        <NewPostForm setPosts={setPosts} />
      </section>
      <h2>timeline</h2>

      <div className="sort-filter-select">
        <select
          name="filter"
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all">all</option>
          <option value="day">last day</option>
          <option value="week">last week</option>
          <option value="month">last month</option>
        </select>

        <select
          className="sort-select"
          name="sort"
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="descending">descending</option>
          <option value="ascending">ascending</option>
        </select>
      </div>

      <section>
        {posts
          ? sorted.map((post) => (
              <Post
                key={post.id}
                post={post}
                posts={posts}
                setPosts={setPosts}
                isTag={true}
                onPostDelete={handlePostDelete}
              />
            ))
          : null}
        {posts && sorted.length ? null : <p>no data available</p>}
      </section>
    </>
  );
}

export default PostList;
