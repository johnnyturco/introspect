class PostSerializer < ActiveModel::Serializer
  attributes :id, :post_text, :mood
  has_one :user
  has_one :tag
end
