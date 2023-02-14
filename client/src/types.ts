export interface Post{
  id: number;
  post_text: string;
  mood: string;
  created_at: string
  tag: Tag
  user: User
}

export interface Tag{
  id: number;
  tag_name: string;
  user_id: number;
}

export type TagWithPosts = Tag & {
  posts: Post[]
}

export interface User{
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_digest: string
}