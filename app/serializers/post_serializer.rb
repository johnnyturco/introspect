class PostSerializer < ActiveModel::Serializer
  attributes :id, :created_date, :post_text, :mood
  has_one :user
  has_one :tag
end
