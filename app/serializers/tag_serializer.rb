class TagSerializer < ActiveModel::Serializer
  attributes :id, :tag_name, :user_id
end
