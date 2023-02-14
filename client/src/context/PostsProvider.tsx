import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { UserContext } from "./UserProvider";
import { Post } from "../types";

interface PostContextValue {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  postsLoaded: boolean;
}

const PostsContext = createContext<PostContextValue>({
  posts: [],
  setPosts: () => {},
  postsLoaded: false,
});

interface PostsProviderProps {
  children: React.ReactNode;
}

const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState<Post[]>([]);

  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      fetch(`/posts`)
        .then((r) => r.json())
        .then((postsFromServer) => {
          setPosts(postsFromServer);
          setPostsLoaded(true);
        });
    }
  }, [user]);

  return (
    <PostsContext.Provider value={{ posts, setPosts, postsLoaded }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };
