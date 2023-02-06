import { useContext, useState } from "react";
import { TagsContext } from "../context/TagsProvider";
import TagCategory from "../components/TagCategory";

function Tags() {
  const { tags, setTags } = useContext(TagsContext);

  const [currentTagId, setCurrentTagId] = useState(tags[0].id);

  const filteredTag = tags.find((tag) => tag.id === parseInt(currentTagId));
  // console.log(filteredTag);

  return (
    <div className="tags fade-in-fwd">
      <h2>tags</h2>

      <select name="tag_id" onChange={(e) => setCurrentTagId(e.target.value)}>
        {/* <option value="all">all tags</option> */}
        {tags.map((tag) => (
          <option value={tag.id} key={tag.id}>
            {tag.tag_name}
          </option>
        ))}
      </select>

      <main>
        <TagCategory tag={filteredTag} key={filteredTag.id} />
        {/* {tags.map((tag) => (
          <section>
            <TagCategory tag={tag} key={tag.id} />
          </section>
        ))} */}
      </main>
    </div>
  );
}

export default Tags;
