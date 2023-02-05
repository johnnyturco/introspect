import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";

const TagsContext = createContext();

function TagsProvider({ children }) {
  const { user } = useContext(UserContext);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/tags`)
        .then((r) => r.json())
        .then((tagsFromServer) => setTags(tagsFromServer));
    }
  }, [user]);

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
}

export { TagsContext, TagsProvider };
