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
  const { userLoaded } = useContext(UserContext);

  const [posts, setPosts] = useState<Post[]>([]);

  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    if (userLoaded) {
      fetch(`/posts`)
        .then((r) => r.json())
        .then((postsFromServer) => {
          setPosts(postsFromServer);
          setPostsLoaded(true);
        });
    }
  }, [userLoaded]);

  return (
    <PostsContext.Provider value={{ posts, setPosts, postsLoaded }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };
