class Post < ApplicationRecord
  belongs_to :User
  belongs_to :Tag
end
