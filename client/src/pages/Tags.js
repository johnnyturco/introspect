import { useContext } from 'react';
// import { UserContext } from '../context/UserProvider';
import { TagsContext } from '../context/TagsProvider';

function Tags() {

  // let { user } = useContext(UserContext);
  const { tags, setTags } = useContext(TagsContext);

  if (tags) {
    tags.map((tag) => (
      console.log(tag.tag_name)
    ))
  }

  return (
    <h2>Tags</h2>
  )
}

export default Tags;