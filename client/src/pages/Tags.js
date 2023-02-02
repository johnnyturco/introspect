import { useContext } from "react";
// import { UserContext } from '../context/UserProvider';
import { TagsContext } from "../context/TagsProvider";
import TagCategory from "../components/TagCategory";

function Tags() {
  // let { user } = useContext(UserContext);
  const { tags, setTags } = useContext(TagsContext);

  // if (tags) {
  //   tags.map((tag) => console.log(tag));
  // }

  return (
    <container className="tags">
      <h2>tags</h2>
      <main>
        {tags.map((tag) => (
          <section>
            <TagCategory tag={tag} key={tag.id} />
          </section>
        ))}
      </main>
    </container>
  );
}

export default Tags;
