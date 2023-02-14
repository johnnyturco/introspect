class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.text :post_text
      t.string :mood
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :tag, null: true, foreign_key: true

      t.timestamps
    end
  end
end
