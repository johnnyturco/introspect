import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { UserContext } from "./UserProvider";
import { TagWithPosts } from "../types";

interface TagContextValue {
  tags: TagWithPosts[];
  setTags: Dispatch<SetStateAction<TagWithPosts[]>>;
  tagsLoaded: boolean;
}

const TagsContext = createContext<TagContextValue>({
  tags: [],
  setTags: () => {},
  tagsLoaded: false,
});

interface TagsProviderProps {
  children: React.ReactNode;
}

const TagsProvider: React.FC<TagsProviderProps> = ({ children }) => {
  const { user } = useContext(UserContext);

  const [tags, setTags] = useState<TagWithPosts[]>([]);

  const [tagsLoaded, setTagsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      fetch(`/tags`)
        .then((r) => r.json())
        .then((tagsFromServer) => {
          setTags(tagsFromServer);
          setTagsLoaded(true);
        });
    }
  }, [user]);

  return (
    <TagsContext.Provider value={{ tags, setTags, tagsLoaded }}>
      {children}
    </TagsContext.Provider>
  );
};

export { TagsContext, TagsProvider };
