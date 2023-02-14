import { useContext, useState } from "react";
import { TagsContext } from "../context/TagsProvider";
import TagCategory from "../components/TagCategory";

const Tags = () => {
  const { tags } = useContext(TagsContext);

  const [currentTagId, setCurrentTagId] = useState(tags[0].id);

  // const filteredTag = tags.find((tag) => tag.id === parseInt(currentTagId));
  const filteredTag = tags.find((tag) => tag.id === currentTagId);

  return (
    <div className="tags fade-in-fwd">
      <h2>tags</h2>

      <select
        name="tag_id"
        onChange={(e) => setCurrentTagId(parseInt(e.target.value))}
      >
        {tags.map((tag) => (
          <option value={tag.id} key={tag.id}>
            {tag.tag_name}
          </option>
        ))}
      </select>

      <main>
        {filteredTag ? (
          <TagCategory tag={filteredTag} key={filteredTag.id} />
        ) : (
          <p>tag not found</p>
        )}
      </main>
    </div>
  );
};

export default Tags;
