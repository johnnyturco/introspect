import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserProvider';

const PostsContext = createContext();

function PostsProvider({ children }) {

  const { user } = useContext(UserContext);

  const [ posts, setPosts ] = useState(null)

  useEffect(() => {
    if (user) {
      fetch(`/posts`)
        .then((r) => r.json())
        .then((postsFromServer) => setPosts(postsFromServer))
    }
  }, [user])

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      { children }
    </PostsContext.Provider>
  )
}

export { PostsContext, PostsProvider }