class PostSerializer < ActiveModel::Serializer
  attributes :id, :post_text, :mood, :created_at
  has_one :user
  has_one :tag
end
