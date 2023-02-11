class Post < ApplicationRecord
  belongs_to :user
  belongs_to :tag, optional: true
end
