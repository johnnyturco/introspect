class User < ApplicationRecord
  has_secure_password

  has_many :posts, dependent: :destroy
  has_many :tags, through: :posts

  validates_presence_of :first_name, :last_name, :email, :password
  validates :email, uniqueness: true
  validates :password, length: {minimum: 3}
end
