puts "Clearing database…"
User.destroy_all
Tag.destroy_all
Post.destroy_all

puts "Creating users…"
johnny = User.create(first_name: "Johnny", last_name: "Turco", email: "johnnyturco@email.com", password: "123")

puts "Creating tags…"
$personal = Tag.create(tag_name: "personal", user_id: johnny.id)
$work = Tag.create(tag_name: "work", user_id: johnny.id)
$school = Tag.create(tag_name: "school", user_id: johnny.id)

puts "Creating posts…"

def random_mood
  moods = ["happy", "sad", "surprised", "fearful", "angry", "disgusted", "other"]
  return moods[rand(7)]
end

def random_tag
  tags = [$personal.id, $work.id, $school.id]
  return tags[rand(3)]
end

def random_post_text
  text = Faker::GreekPhilosophers.quote, Faker::GreekPhilosophers.quote, Faker::GreekPhilosophers.quote, Faker::GreekPhilosophers.quote
  return text.join(" ")
end

def random_time
  from = Time.local(2022, 10, 1)
  to = Time.now
  Time.at(from + rand * (to.to_f - from.to_f))
end

100.times {Post.create(user_id: johnny.id, tag_id: random_tag(), mood: random_mood(), post_text: random_post_text(), created_at: random_time())}

puts "Done seeding!"