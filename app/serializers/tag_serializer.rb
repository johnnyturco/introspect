class TagSerializer < ActiveModel::Serializer
  attributes :id, :tag_name, :created_date
end
