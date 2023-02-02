import { useContext } from "react";
import { PostsContext } from "../context/PostsProvider";

function Trends() {
  const { posts } = useContext(PostsContext);

  const numOfPosts = posts.length;

  function moodPercentage(mood) {
    return (
      (posts.filter((post) => post.mood === mood).length / numOfPosts) * 100
    );
  }

  return (
    <div>
      <p>happy: {moodPercentage("happy")}</p>
      <p>sad: {moodPercentage("sad")}</p>
      <p>surprised: {moodPercentage("surprised")}</p>
      <p>fearful: {moodPercentage("fearful")}</p>
      <p>angry: {moodPercentage("angry")}</p>
      <p>disgusted: {moodPercentage("disgusted")}</p>
      <p>other: {moodPercentage("other")}</p>
    </div>
  );
}

export default Trends;
