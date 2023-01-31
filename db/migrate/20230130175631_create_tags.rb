class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :tag_name
      t.integer :user_id

      t.timestamps
    end
  end
end
