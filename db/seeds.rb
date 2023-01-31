puts "Clearing database…"
User.destroy_all
Tag.destroy_all
Post.destroy_all

puts "Creating users…"
johnny = User.create(first_name: "Johnny", last_name: "Turco", email: "johnnyturco@email.com", password: "123")
matt = User.create(first_name: "Matt", last_name: "Turco", email: "mattturco@email.com", password: "123")
anna = User.create(first_name: "Anna", last_name: "Harder", email: "annaqhh@email.com", password: "123")
rachel = User.create(first_name: "Rachel", last_name: "Humes", email: "rhumes@email.com", password: "123")

puts "Creating tags…"
red = Tag.create(tag_name: "red", user_id: johnny.id)
orange = Tag.create(tag_name: "orange", user_id: matt.id)
yellow = Tag.create(tag_name: "yellow", user_id: anna.id)
green = Tag.create(tag_name: "green", user_id: rachel.id)
blue = Tag.create(tag_name: "blue", user_id: johnny.id)
purple = Tag.create(tag_name: "purple", user_id: matt.id)
gray = Tag.create(tag_name: "gray", user_id: anna.id)

puts "Creating posts…"
p01 = Post.create(user_id: johnny.id, tag_id: red.id, post_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", mood: "happy")
p02 = Post.create(user_id: matt.id, tag_id: orange.id, post_text: "Pellentesque dictum tortor ipsum, quis porttitor sem venenatis a.", mood: "sad")
p03 = Post.create(user_id: anna.id, tag_id: yellow.id, post_text: "Integer finibus luctus nulla.", mood: "fearful")
p04 = Post.create(user_id: rachel.id, tag_id: green.id, post_text: "Vestibulum iaculis in risus vitae blandit.", mood: "angry")
p05 = Post.create(user_id: johnny.id, tag_id: blue.id, post_text: "Donec aliquet at mauris eget sagittis.", mood: "surprised")
p06 = Post.create(user_id: matt.id, tag_id: purple.id, post_text: "Duis placerat, arcu eu maximus tincidunt, lacus dolor scelerisque nunc, sit amet pellentesque nibh metus sit amet ipsum.", mood: "disgusted")
p07 = Post.create(user_id: anna.id, tag_id: gray.id, post_text: "Donec mi ligula, consequat non nisl ultrices, ultrices feugiat tellus.", mood: "disgusted")
p08 = Post.create(user_id: rachel.id, tag_id: red.id, post_text: "Aliquam ultricies euismod pretium.", mood: "angry")
p09 = Post.create(user_id: johnny.id, tag_id: orange.id, post_text: "Sed vestibulum vehicula dolor eget condimentum.", mood: "happy")
p10 = Post.create(user_id: matt.id, tag_id: yellow.id, post_text: "Etiam eu neque vel libero pretium feugiat.", mood: "fearful")
p11 = Post.create(user_id: anna.id, tag_id: green.id, post_text: "Praesent ultricies mi non ullamcorper elementum.", mood: "sad")
p12 = Post.create(user_id: rachel.id, tag_id: blue.id, post_text: "Proin malesuada nulla magna, in ultricies nisi tempor vitae.", mood: "surprised")

puts "Done seeding!"