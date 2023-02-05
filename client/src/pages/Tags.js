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
    <div className="tags fade-in-fwd">
      <h2>tags</h2>
      <main>
        {tags.map((tag) => (
          <section>
            <TagCategory tag={tag} key={tag.id} />
          </section>
        ))}
      </main>
    </div>
  );
}

export default Tags;
