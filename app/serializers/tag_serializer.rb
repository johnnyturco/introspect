class TagSerializer < ActiveModel::Serializer
  attributes :id, :tag_name, :user_id

  has_many :posts
end
