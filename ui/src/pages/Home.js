import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../Requests";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

function Home() {
  const [num, setNum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestMovies, setLatestMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const topratedData = await fetch(
          "/.netlify/functions/get-all-top-rated"
        ).then((response) => response.json());
        setTopRatedMovies(topratedData.data);
        setNum(
          Math.floor(Math.ceil(Math.random() * topratedData.data.length) - 1)
        );
        // Trending
        const trendingData = await fetch(
          "/.netlify/functions/get-all-popular"
        ).then((response) => response.json());
        setTrendingMovies(trendingData.data);
        /**
         * We just NEEDED 2 of these data to show on
         * viewable screen at the very first ( reduce loading time)
         * */
        setLoading(false);
        const upcomingData = await fetch(
          "/.netlify/functions/get-all-upcoming"
        ).then((response) => response.json());
        setUpcomingMovies(upcomingData.data);

        const latestData = await fetch(
          "/.netlify/functions/get-all-latest"
        ).then((response) => response.json());
        setLatestMovies(latestData.data);
      } catch (error) {
        setTimeout(() => setLoading(false), 3000);
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  if (loading) return <Loading />;

  return (
    <div>
      <Navbar />
      <Banner topRatedMovies={topRatedMovies[num]} />
      {trendingMovies && (
        <Row title="POPULAR" isLargeRow data={trendingMovies} />
      )}
      {latestMovies && <Row title="Latest" data={latestMovies} />}
      {upcomingMovies && <Row title="Upcoming" data={upcomingMovies} />}
      {topRatedMovies && <Row title="Top Rated" data={topRatedMovies} />}
      <Footer />
    </div>
  );
}

export default Home;
