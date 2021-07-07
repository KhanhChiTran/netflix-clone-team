import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../Requests";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

function Home() {
  const [loading, setLoading] = useState(true);
  const [latestMovies, setLatestMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const topratedData = await fetch(requests.fetchTopRated).then(
          (response) => response.json()
        );
        console.log(topratedData);
        setTopRatedMovies(topratedData);
        const latestData = await fetch(requests.fetchLatest).then((response) =>
          response.json()
        );
        setLatestMovies(latestData.results);
        const trendingData = await fetch(requests.fetchTrending).then(
          (response) => response.json()
        );
        setTrendingMovies(trendingData);
        const upcomingData = await fetch(requests.fetchUpcoming).then(
          (response) => response.json()
        );
        setUpcomingMovies(upcomingData);

        setLoading(false);
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
      {/* {loading && <Loading />} */}
      <Navbar />
      <Banner
        topRatedMovies={
          topRatedMovies[Math.floor(Math.ceil(Math.random() * 11) - 1)]
        }
      />
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
