class TagWithPostsSerializer < ActiveModel::Serializer
  attributes :id, :tag_name, :user_id, :posts

  def posts
    object.posts.filter do |post|
      if post.user_id == object.user_id
        {
          id: post.id,
          user_id: post.user_id,
          post_text: post.post_text,
          mood: post.mood
        }
      end
    end
  end
end
