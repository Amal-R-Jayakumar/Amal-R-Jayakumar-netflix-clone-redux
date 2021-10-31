import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import "./Banner.css";
import axios from "../axios";
import requests from "../Request";
import Row from "./Row";
const useStyles = makeStyles({
  banner: {
    position: "relative",
    minHeight: "40vh",
    color: "#ffffff",
    objectFit: "contain",
  },
  banner__contents: {
    paddingLeft: "30px",
    paddingTop: "140px",
    minHeight: "40vh",
    paddingBottom: "5.4rem",
    background: "linear-gradient(to left,rgba(37,37,37,0.61),rgba(56,56,56,.43))",
  },
  banner__title: {
    fontSize: "3rem",
    fontWeight: "800",
    paddingBottom: "0.3rem",
  },
  banner__description: {
    width: "45rem",
    lineHeight: "1.3",
    paddingTop: "1rem",
    fontSize: "0.8rem",
    maxWidth: "360px",
    height: "80px",
  },
  bannerFadeBottom: {
    height: "7.4rem",
    // backgroundImage: "linear-gradient(180deg,transparent,rgba(37,37,37,0.61),#111)",
  },
  banner__button: {
    cursor: "pointer",
    color: "#ffffff",
    outline: "none",
    border: "none",
    fontWeight: "700",
    borderRadius: "0.2vw",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    margin: "1rem",
    padding: "0.5rem 2rem",
    backgroundColor: "rgba(229,9,20,0.6)",
    "&:hover": {
      color: "#000000",
      backgroundColor: "#e6e6e6",
      transition: "all 0.2s",
    },
  },
});

function Banner() {
  const classes = useStyles();
  const [movie, setMovie] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.round(Math.random() * request.data.results.length - 1)]);
      return request;
    }
    fetchData();
  }, []);
  // console.log(movie)
  function truncate(string, n) {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  }
  function clickAlert() {
    console.log("Alert");
  }

  return (
    <div>
      <Box spacing={2} className={classes.banner} style={{ backgroundImage: movie.backdrop_path ? `url( https://image.tmdb.org/t/p/original${movie.backdrop_path} )` : "", backgroundSize: "cover", backgroundPosition: "top center" }}>
        <div className={classes.banner__contents}>
          <Typography component="h3" variant="h3" className={classes.banner__title}>
            {movie?.title || movie?.name || movie?.original_name}
          </Typography>
          <Box className={classes.banner__buttons} sx={{ gap: 2 }}>
            <Button variant="contained" color="error" className={classes.banner__button}>
              Play
            </Button>
            <Button variant="contained" color="error" className={classes.banner__button}>
              My List
            </Button>
          </Box>
          <Typography component="h6" variant="body2" className={classes.banner__description}>
            {truncate(movie?.overview, 150)}
          </Typography>
          {/* {movie.backdrop_path && <div className={classes.bannerFadeBottom} />} */}
        </div>
      </Box>
      <Row onImageClick={clickAlert} title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>
  );
}

export default Banner;
