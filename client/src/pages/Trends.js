import { useContext } from "react";
import { PostsContext } from "../context/PostsProvider";
import { PieChart } from "react-minimal-pie-chart";
import { subDays, subMonths, isWithinInterval } from "date-fns";

function Trends() {
  const { posts } = useContext(PostsContext);

  const allMoods = [
    "happy",
    "sad",
    "surprised",
    "fearful",
    "angry",
    "disgusted",
    "other",
  ];

  const colors = [
    "#69e257",
    "#8a57e3",
    "#e2cf57",
    "#e257ae",
    "#e28957",
    "#e25768",
  ];

  const labelStyles = {
    fill: "white",
    fontSize: "5px",
    fontFamily: "Helvetica Neue,sans-serif",
    textShadow: "1px 1px 5px #000",
  };

  // ***************************

  // function isPostWithin(createdDate, withinYear, withinMonth, withinDay) {
  //   const today = new Date();
  //   const daysAgo = new Date(
  //     today.getFullYear() - withinYear,
  //     today.getMonth() - withinMonth,
  //     today.getDate() - withinDay
  //   );
  //   const postDate = new Date(createdDate);
  //   return postDate <= today && postDate > daysAgo;
  // }

  // const postsWithinDay = posts.filter((post) =>
  //   isPostWithin(post.created_at, 0, 0, 0)
  // );
  // const postsWithinWeek = posts.filter((post) =>
  //   isPostWithin(post.created_at, 0, 0, 7)
  // );
  // const postsWithinMonth = posts.filter((post) =>
  //   isPostWithin(post.created_at, 0, 1, 0)
  // );

  // ***************************

  // Refactor of date calculations with date-fns
  const postsWithinDay = posts.filter((post) =>
    isWithinInterval(new Date(post.created_at), {
      start: subDays(new Date(), 1),
      end: new Date(),
    })
  );
  const postsWithinWeek = posts.filter((post) =>
    isWithinInterval(new Date(post.created_at), {
      start: subDays(new Date(), 7),
      end: new Date(),
    })
  );
  const postsWithinMonth = posts.filter((post) =>
    isWithinInterval(new Date(post.created_at), {
      start: subMonths(new Date(), 1),
      end: new Date(),
    })
  );
  // ***************************

  function moodPercentage(postsArray, mood, totalPosts) {
    return (
      (postsArray.filter((post) => post.mood === mood).length / totalPosts) *
      100
    );
  }

  const moodDataOverall = [];
  const moodDataDay = [];
  const moodDataWeek = [];
  const moodDataMonth = [];

  function generateChart(postsArray, timePeriod) {
    const totalPosts = postsArray.length;
    const applicableMoods = allMoods.filter(
      (oneMood) => moodPercentage(postsArray, oneMood, totalPosts) > 0
    );
    applicableMoods.map((oneMood) =>
      timePeriod.push({
        title: oneMood,
        value: moodPercentage(postsArray, oneMood, totalPosts),
        color: "",
      })
    );
    for (let i = 0; i < timePeriod.length; i++) {
      timePeriod[i].color = colors[i];
    }
    if (timePeriod.length > 0) {
      return timePeriod;
    } else {
      timePeriod = {
        title: "no data",
      };
    }
    return timePeriod;
  }

  return (
    <div className="trends">
      <h2>trends</h2>
      <main className="card-container">
        <section className="fade-in-fwd-up">
          <h3>overall</h3>
          {posts.length ? (
            <PieChart
              label={
                ({ dataEntry }) => dataEntry.title
                // `${dataEntry.title} ${Math.round(dataEntry.value)}%`
              }
              labelStyle={labelStyles}
              labelPosition={75}
              data={generateChart(posts, moodDataOverall)}
            />
          ) : (
            <p>no data available</p>
          )}
        </section>
        <section className="fade-in-fwd-up">
          <h3>last day</h3>
          {postsWithinDay.length ? (
            <PieChart
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={labelStyles}
              labelPosition={75}
              data={generateChart(postsWithinDay, moodDataDay)}
            />
          ) : (
            <p>no data available</p>
          )}
        </section>
        <section className="fade-in-fwd-up">
          <h3>last week</h3>
          {postsWithinWeek.length ? (
            <PieChart
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={labelStyles}
              labelPosition={75}
              data={generateChart(postsWithinWeek, moodDataWeek)}
            />
          ) : (
            <p>no data available</p>
          )}
        </section>
        <section className="fade-in-fwd-up">
          <h3>last month</h3>
          {postsWithinMonth.length ? (
            <PieChart
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={labelStyles}
              labelPosition={75}
              data={generateChart(postsWithinMonth, moodDataMonth)}
            />
          ) : (
            <p>no data available</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Trends;
